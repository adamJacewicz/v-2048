import { GameState, MovementOptions, Position, Tile } from "../game.types"
import { computed, readonly } from "vue"
import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  hasSamePosition,
  groupBy,
  moveRows,
  generateId,
} from "../utils"
import { Axis } from "../constants"
import { useStorage } from "@vueuse/core"

export const createTile = (initialValues: Partial<Tile> & Position) => ({
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
  state.value.tiles = state.value.tiles.filter((tile) => !tile.merged)
}

const initGame = () => {
  reset()
  addTile()
  addTile()
}

const move = ({ axis, order }: MovementOptions) => {
  removeMergedTiles()
  const orderedBoard = groupBy(state.value.tiles, axis)
  const { score, updated } = moveRows(orderedBoard, axis, order)
  updateScore(score)
  updated && addTile()
}

const reset = () => {
  state.value.tiles = []
  state.value.score = 0
}

const addTile = (tile?: Tile): void => {
  if (!availablePositions.value.length) return
  const position = getRandomItem(availablePositions.value)
  const newTile = tile ?? createTile(position)
  state.value.tiles.push(newTile)
}

const isCellAvailable = (coords: Position) =>
  !state.value.tiles.some((tile) => hasSamePosition(tile, coords))

const isGameOver = computed(
  () => !isMergePossible.value && availablePositions.value.length === 0
)

const availablePositions = computed(() => allPositions.filter(isCellAvailable))

const isMergePossible = computed(() =>
  groupBy(
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
)

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
    reset,
    move,
    addTile,
  })
