import {
  AxisType,
  DirectionType,
  MovementOptions,
  Tile,
} from "./stores/game.types"
import { movementOptions, Order } from "./constants"

export const deepClone = <T>(obj: any): T => {
  if (obj === null) return null
  let clone = { ...obj }
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  )
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone
}

export const BOARD_SIZE = 4
const useIndex = () => {
  let index = 0
  return {
    get: () => index++,
  }
}

const index = useIndex()

export const initializeArrayWithRange = (end: number, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start) / step) },
    (v, i) => i * step + start
  )

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createTile = (tile: Pick<Tile, "x" | "y" | "value">): Tile => ({
  ...tile,
  merged: false,
  id: index.get(),
  move(axis, value) {
    this[axis] = value
  },
  merge() {
    this.merged = true
  },
  update() {
    this.value *= 2
  },
})

export const sortAndGroup = (
  tiles: Tile[],
  { sortBy, groupBy, order }: MovementOptions
) =>
  initializeArrayWithRange(BOARD_SIZE).map((i) =>
    deepClone<Tile[]>(tiles)
      .filter((tile) => tile[groupBy] === i)
      .sort((a, b) => order * (a[sortBy] - b[sortBy]))
  )

export const moveItems = (tiles: Tile[], axis: AxisType, order: Order) => {
  const changes: Tile[] = []
  let score: number = 0
  const firstPosition = order === Order.ASC ? 0 : BOARD_SIZE - 1
  tiles.reduce((curr: Tile | null, next: Tile) => {
    const position = curr ? curr[axis] + order : firstPosition
    if (!!curr && !curr.merged && curr.value === next.value) {
      next.merged = true
      next[axis] = curr[axis]
      curr.value *= 2
      score += curr.value
      changes.push(next)
      !changes.includes(curr) && changes.push(curr)
    } else if (position !== next[axis]) {
      next[axis] = position
      changes.push(next)
    }
    return next
  }, null)
  return changes
}

export const getMovementOptions = (key: string) => {
  const direction = key
    .replace(/arrow/i, "")
    .toUpperCase() as Uppercase<DirectionType>
  return movementOptions[direction]
}
