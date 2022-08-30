import { GameState, MovementOptions, Tile } from "../stores/game.types"
import { computed, reactive, readonly, toRefs, watch } from "vue"
import { useTile } from "./use-tile"
import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  handleMove,
  isCellAvailable,
  transformIntoMatrix,
} from "../utils"
import { Axis } from "../constants"
import { useLocalStorage } from "./use-local-storage"

const storage = useLocalStorage("2048")

const getInitialState = (): GameState => ({
  tiles: [],
  score: 0,
  best: 0,
})

export const use2048 = (
  { persist } = {
    persist: true,
  }
) => {
  const state = reactive<GameState>(
    persist ? storage.value || getInitialState() : getInitialState()
  )
  const { tiles, score, best } = toRefs(state)

  persist &&
    watch(state, () => {
      storage.value = state
    })

  const updateScore = (value: number) => {
    score.value += value
    score.value > best.value && (best.value = score.value)
  }

  const removeMergedTiles = () => {
    tiles.value = tiles.value.filter((tile) => !tile.merged)
  }

  const initGame = () => {
    if (gameOver.value || !persist) reset()
    if (!persist || !tiles.value.length) {
      addTile()
      addTile()
    }
  }

  const move = (options: MovementOptions) => {
    if (!options) return
    removeMergedTiles()
    const move = handleMove(options)
    let points = 0
    let tilesMoved = false
    const matrix = transformIntoMatrix(tiles.value, options.axis)
    matrix.forEach((row) => {
      const { score, moved } = move(row)
      points += score
      tilesMoved = tilesMoved || moved
    })
    updateScore(points)
    tilesMoved && addTile()
  }

  const isMergePossible = computed(() =>
    transformIntoMatrix(tiles.value, Axis.X)
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
  )

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

  const availablePositions = computed(() =>
    allPositions.filter((position) => isCellAvailable(tiles.value, position))
  )

  return readonly({
    score,
    best,
    tiles,
    updateScore,
    removeMergedTiles,
    initGame,
    reset,
    move,
    isMergePossible,
    gameOver,
    addTile,
    availablePositions,
  })
}
