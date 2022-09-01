import { GameState, MovementOptions, Position, Tile } from "../game.types"
import { computed, readonly, toRefs } from "vue"
import { useTile } from "./use-tile"
import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  hasSamePosition,
  moveRow,
  transformIntoMatrix,
} from "../utils"
import { Axis } from "../constants"
import { useStorage } from "@vueuse/core"

const getInitialState = () => ({
  tiles: [],
  score: 0,
  best: 0,
})

const createStore = () => {
  const state = useStorage<GameState>("2048", getInitialState(), localStorage, {
    serializer: {
      read: (value) => {
        const parsedState = JSON.parse(value)
        parsedState.tiles = parsedState.tiles.map(useTile)
        return parsedState
      },
      write: JSON.stringify,
    },
  })
  const { tiles, score, best } = toRefs(state.value)

  const updateScore = (value: number) => {
    score.value += value
    score.value > best.value && (best.value = score.value)
  }

  const removeMergedTiles = () => {
    tiles.value = tiles.value.filter((tile) => !tile.merged)
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
    transformIntoMatrix(tiles.value, axis).forEach((row) => {
      const { score, moved } = moveRow(row, axis, order)
      points += score
      tilesMoved = tilesMoved || moved
    })
    updateScore(points)
    tilesMoved && addTile()
  }

  const isMergePossible = computed(() => {
    return transformIntoMatrix(tiles.value, Axis.X)
      .flat()
      .some((tile, i, arr) => {
        const nextTile = arr[i + 1]
        const bottomTile = arr[i + BOARD_SIZE]
        return (
          (nextTile &&
            nextTile.y === tile.y &&
            nextTile.value === tile.value) ||
          (bottomTile && bottomTile.value === tile.value)
        )
      })
  })

  const reset = () => {
    tiles.value = []
    score.value = 0
  }

  const gameOver = computed(
    () => !isMergePossible.value && availablePositions.value.length === 0
  )

  const addTile = (tile?: Tile): void => {
    const position = getRandomItem(availablePositions.value)
    if (!position) return
    const newTile = tile ?? useTile(position)
    tiles.value.push(newTile)
  }

  const isCellAvailable = (coords: Position) =>
    !tiles.value.some((tile) => hasSamePosition(tile, coords))

  const availablePositions = computed(() =>
    allPositions.filter(isCellAvailable)
  )

  return () =>
    readonly({
      score,
      best,
      tiles,
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
}
export const use2048 = createStore()
