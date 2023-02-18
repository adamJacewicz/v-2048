import { GameState, keyType, MaybeTile, Position } from "../game.types"
import { computed, readonly } from "vue"
import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  hasSamePosition,
  groupBy,
  moveRows,
  generateId,
  getMovementOptions,
} from "../utils"
import { Axis } from "../constants"
import { useStorage, useThrottleFn } from "@vueuse/core"

export const createTile = (initialValues: MaybeTile) => ({
  value: Math.random() < 0.8 ? 2 : 4,
  merged: false,
  id: generateId(),
  ...initialValues,
})

const getInitialState = () => ({
  tiles: [],
  score: 0,
  best: 0,
})

const state = useStorage<GameState>("2048", getInitialState, localStorage, {
  serializer: {
    read: (value) => {
      try {
        return JSON.parse(value)
      } catch (err) {
        return getInitialState
      }
    },
    write: JSON.stringify,
  },
})

const updateScore = (value: number) => {
  state.value.score += value
  state.value.score > state.value.best && (state.value.best = state.value.score)
}

const removeMergedTiles = () => {
  state.value.tiles = state.value.tiles.filter(({ merged }) => !merged)
}

const isPositionAvailable = (position: Position) =>
  !state.value.tiles.some((tile) => hasSamePosition(tile, position))

const reset = () => {
  state.value.tiles = []
  state.value.score = 0
}

const initGame = () => {
  reset()
  addTile()
  addTile()
}

const move = useThrottleFn((key: keyType) => {
  const options = getMovementOptions(key)
  if (!options) return
  const { axis, order } = options
  removeMergedTiles()
  const orderedBoard = groupBy(state.value.tiles, axis)
  const { score, updated } = moveRows(orderedBoard, axis, order)
  updateScore(score)
  updated && addTile()
}, 150)

const addTile = (
  tile: MaybeTile | undefined = getRandomItem(availablePositions.value)
): void => {
  if (!tile || !isPositionAvailable(tile)) return
  state.value.tiles.push(createTile(tile))
}

const isGameOver = computed(
  () => !isMergePossible.value && availablePositions.value.length === 0
)

const availablePositions = computed<Position[]>(() =>
  allPositions.filter((coords) => isPositionAvailable(coords))
)

const isMergePossible = computed(() => {
  return groupBy(
    state.value.tiles.filter((items) => !items.merged),
    Axis.X
  )
    .flat()
    .some((tile, i, arr) => {
      const nextTile = arr.slice(i + 1).find(({ y }) => y === tile.y)
      const bottomTile = arr.slice(i + BOARD_SIZE).find(({ x }) => x === tile.x)
      return (
        (nextTile && nextTile.value === tile.value) ||
        (bottomTile && bottomTile.value === tile.value)
      )
    })
})

export default () =>
  readonly({
    score: computed(() => state.value.score),
    best: computed(() => state.value.best),
    tiles: computed(() => state.value.tiles),
    isMergePossible,
    isGameOver,
    availablePositions,
    updateScore,
    removeMergedTiles,
    initGame,
    move,
    reset,
    addTile,
  })
