import { GameState, keyType, Position, Tile } from "./types"
import { computed } from "vue"
import {
	getRandomItem,
	createTile,
	getMovementOptions,
	mergeTiles,
	getCellIndex,
	allPositions, isPositionExists, isValidPosition
} from "./utils"
import { BOARD_SIZE, Order, Axis } from "./constants"
import { createGlobalState, toReactive, useStorage } from "@vueuse/core"

const getInitialState = () => ({
  tiles: [],
  score: 0,
  best: 0,
})

export const useStore = createGlobalState(() => {
  const state = toReactive(
    useStorage<GameState>("2048", getInitialState(), localStorage, {
      serializer: {
        read: (value) => {
          try {
            return JSON.parse(value)
          } catch (err) {
            return getInitialState()
          }
        },
        write: JSON.stringify,
      },
    })
  )

  const updateScore = (value: number) => {
    state.score += value
    state.score > state.best && (state.best = state.score)
  }

  const removeMergedTiles = () => {
    state.tiles = state.tiles.filter(({ merged }) => !merged)
  }



  const reset = () => {
    state.tiles = []
    state.score = 0
  }

  const initGame = () => {
    reset()
    addTile()
    addTile()
  }

  const move = (key: keyType) => {
    removeMergedTiles()
    const { axis, order } = getMovementOptions(key)
    const groupAxis = axis === Axis.X ? Axis.Y : Axis.X
    const firstPosition = order === Order.ASC ? 0 : BOARD_SIZE - 1
    let score = 0
    let isUpdated = false
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = state.tiles
        .filter((tile) => tile[groupAxis] === i)
        .sort((a, b) => (a[axis] - b[axis]) * order)

      row.forEach((tile, i) => {
        const prev = row[i - 1]
        const position = !!prev ? prev[axis] + order : firstPosition
        if (!!prev && !prev.merged && tile.value === prev.value) {
          mergeTiles(tile, prev)
          score += prev.value
          isUpdated = true
        } else if (tile[axis] !== position) {
          isUpdated = true
          tile[axis] = position
        }
      })
    }

    return {
      score, isUpdated
    }
  }

  const addTile = (tile?: Partial<Tile>): void => {
    const newTile = createTile({
      ...getRandomItem(availablePositions.value),
      ...tile,
    })
    isValidPosition(newTile) &&
    !isPositionExists(newTile, state.tiles) &&
    state.tiles.push(newTile)

  }

  const isGameOver = computed(
    () => !isMergePossible.value && availablePositions.value.length === 0
  )

  const availablePositions = computed<Position[]>(() =>
    allPositions.filter((coords) => !isPositionExists(coords, state.tiles))
  )

  const isMergePossible = computed(() =>
    state.tiles
      .filter((items) => !items.merged)
      .sort((a, b) => getCellIndex(a) - getCellIndex(b))
      .some((tile, i, arr) => {
        const nextTile = arr.slice(i + 1).find(({ y }) => y === tile.y)
        const bottomTile = arr
          .slice(i + BOARD_SIZE)
          .find(({ x }) => x === tile.x)
        return (
          (nextTile && nextTile.value === tile.value) ||
          (bottomTile && bottomTile.value === tile.value)
        )
      })
  )

  return {
    score: computed(() => state.score),
    best: computed(() => state.best),
    tiles: computed(() => state.tiles),
    isMergePossible,
    isGameOver,
    availablePositions,
    addTile,
    reset,
    initGame,
    move,
    removeMergedTiles,
    updateScore,
  }
})