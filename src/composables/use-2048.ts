import { GameState, MovementOptions, Position, Tile } from "../game.types"
import { computed, readonly } from "vue"
import { useTile } from "./use-tile"
import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  hasSamePosition,
  moveRow,
  groupBy,
} from "../utils"
import { Axis } from "../constants"
import { useStorage } from "@vueuse/core"

const getInitialState = () => {
  return {
    tiles: [],
    score: 0,
    best: 0,
  }
}

const state = useStorage<GameState>("2048", getInitialState(), localStorage, {
  serializer: {
    read: (value) => {
      try {
        const parsedState = JSON.parse(value)
        parsedState.tiles = parsedState.tiles.map(useTile)
        return parsedState
      } catch (err) {
        return getInitialState()
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
  const notMerged = state.value.tiles.filter((tile) => !tile.merged)
  state.value.tiles.length !== notMerged.length &&
    (state.value.tiles = notMerged)
}

const initGame = () => {
  reset()
  addTile()
  addTile()
}

const move = ({ axis, order }: MovementOptions) => {
  removeMergedTiles()
  let points = 0
  let tilesMoved = false
  groupBy(state.value.tiles, axis).forEach((row) => {
    const { score, moved } = moveRow(row, axis, order)
    points += score
    tilesMoved = tilesMoved || moved
  })
  updateScore(points)
  tilesMoved && addTile()
}

const isMergePossible = computed(() => {
  return groupBy(
    state.value.tiles.filter((items) => !items.merged),
    Axis.X
  )
    .flat()
    .some((tile, i, arr) => {
      const nextTile = arr[i + 1]
      const bottomTile = arr[i + BOARD_SIZE]
      return (
        (nextTile && nextTile.y === tile.y && nextTile.value === tile.value) ||
        (bottomTile && bottomTile.value === tile.value)
      )
    })
})

const reset = () => {
  state.value.tiles = []
  state.value.score = 0
}

const gameOver = computed(
  () => !isMergePossible.value && availablePositions.value.length === 0
)

const addTile = (tile?: Tile): void => {
  if (!availablePositions.value.length) return
  const position = getRandomItem(availablePositions.value)
  const newTile = tile ?? useTile(position)
  state.value.tiles.push(newTile)
}

const isCellAvailable = (coords: Position) =>
  !state.value.tiles.some((tile) => hasSamePosition(tile, coords))

const availablePositions = computed(() => allPositions.filter(isCellAvailable))

export default () =>
  readonly({
    score: computed(() => state.value.score),
    best: computed(() => state.value.best),
    tiles: computed(() => state.value.tiles),
    isMergePossible,
    gameOver,
    availablePositions,
    updateScore,
    removeMergedTiles,
    initGame,
    reset,
    move,
    addTile,
  })
