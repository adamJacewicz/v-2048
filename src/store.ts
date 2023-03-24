import { GameState, keyType, MaybeTile, Position, Tile } from "./game.types"
import { computed } from "vue"
import {
  getRandomItem,
  hasSamePosition,
  generateId,
  getMovementOptions,
  inRange,
  getRandomInteger,
  hasProperties,
  mergeTiles,
  getTileOrder,
  allPositions,
} from "./utils"
import { Axis, BOARD_SIZE, Order } from "./constants"
import { createGlobalState, toReactive, useStorage } from "@vueuse/core"

export const createTile = ({ value, merged, id, x, y }: Partial<Tile>) => ({
  value: value ?? (Math.random() < 0.8 ? 2 : 4),
  merged: merged ?? false,
  id: id ?? generateId(),
  x: x ?? getRandomInteger(0, BOARD_SIZE - 1),
  y: y ?? getRandomInteger(0, BOARD_SIZE - 1),
})

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

  const isValidPosition = (position: Position) =>
    hasProperties(position, "x", "y") &&
    inRange(position.x, 0, BOARD_SIZE) &&
    inRange(position.y, 0, BOARD_SIZE) &&
    !state.tiles.some((tile) => hasSamePosition(tile, position))

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
    let updated = false
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
          updated = true
        } else if (tile[axis] !== position) {
          updated = true
          tile[axis] = position
        }
      })
    }
    updateScore(score)
    updated && addTile()
  }

  const addTile = (tile?: MaybeTile): void => {
    const newTile = createTile({
      ...getRandomItem(availablePositions.value),
      ...tile,
    })
    isValidPosition(newTile) && state.tiles.push(newTile)
  }

  const isGameOver = computed(
    () => !isMergePossible.value && availablePositions.value.length === 0
  )

  const availablePositions = computed<Position[]>(() =>
    allPositions.filter((coords) => isValidPosition(coords))
  )

  const isMergePossible = computed(() =>
    state.tiles
      .filter((items) => !items.merged)
      .sort((a, b) => getTileOrder(a) - getTileOrder(b))
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
