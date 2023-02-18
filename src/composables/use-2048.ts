import { GameState, keyType, MaybeTile, Position } from "../game.types"
import { computed } from "vue"
import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  hasSamePosition,
  groupBy,
  moveRows,
  generateId,
  getMovementOptions,
  inRange,
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

export const updateScore = (value: number) => {
  state.value.score += value
  state.value.score > state.value.best && (state.value.best = state.value.score)
}

export const removeMergedTiles = () => {
  state.value.tiles = state.value.tiles.filter(({ merged }) => !merged)
}

export const isValidPosition = (position: Position) =>
  inRange(position.x, 0, BOARD_SIZE) &&
  inRange(position.y, 0, BOARD_SIZE) &&
  !state.value.tiles.some((tile) => hasSamePosition(tile, position))

export const reset = () => {
  state.value.tiles = []
  state.value.score = 0
}

export const initGame = () => {
  reset()
  addTile()
  addTile()
}

export const move = (key: keyType) => {
  const options = getMovementOptions(key)
  if (!options) return
  const { axis, order } = options
  removeMergedTiles()
  const orderedBoard = groupBy(state.value.tiles, axis)
  const { score, updated } = moveRows(orderedBoard, axis, order)
  updateScore(score)
  updated && addTile()
}
export const addTile = (tile?: MaybeTile): void => {
  const newTile = { ...tile }
  if (!Object.hasOwn(newTile, "x") || !Object.hasOwn(newTile, "y")) {
    const position = getRandomItem(availablePositions.value)
    if (!position) return
    Object.assign(newTile, {
      x: newTile.x ?? position.x,
      y: newTile.y ?? position.y,
    })
  }
  if (!isValidPosition(newTile as MaybeTile)) return
  state.value.tiles.push(createTile(newTile as MaybeTile))
}

const isGameOver = computed(
  () => !isMergePossible.value && availablePositions.value.length === 0
)

const availablePositions = computed<Position[]>(() =>
  allPositions.filter((coords) => isValidPosition(coords))
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

export const store = {
  score: computed(() => state.value.score),
  best: computed(() => state.value.best),
  tiles: computed(() => state.value.tiles),
  isMergePossible,
  isGameOver,
  availablePositions,
}
