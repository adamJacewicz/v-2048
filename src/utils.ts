import {
  AxisType,
  DirectionType,
  MovementOptions,
  Position,
  Tile,
} from "./stores/game.types"
import { Axis, movementOptions, Order } from "./constants"

export const BOARD_SIZE = 4

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomItem = <T>(array: T[]): T =>
  array[getRandomInteger(0, array.length - 1)]

export const transformIntoMatrix = (array: Tile[], axis: AxisType) => {
  const groupBy = axis === Axis.X ? Axis.Y : Axis.X
  return array
    .reduce<Tile[][]>(
      (result, tile) => {
        result[tile[groupBy]].push(tile)
        return result
      },
      Array.from({ length: BOARD_SIZE }, () => [])
    )
    .map((row) => row.sort((a, b) => a[axis] - b[axis]))
}

export const moveItems = (tiles: Tile[], axis: AxisType, order: Order) => {
  let score = 0
  let moved = false
  const firstPosition = order === Order.ASC ? 0 : BOARD_SIZE - 1
  order === Order.DESC && tiles.reverse()
  const arrLength = tiles.length
  for (let i = -1; i < arrLength - 1; i++) {
    const curr = tiles[i]
    const next = tiles[i + 1]
    const position = !!curr ? curr[axis] + order : firstPosition

    if (!!curr && !curr.merged && curr.value === next.value) {
      next.merge()
      next.move(axis, curr[axis])
      curr.update()
      score += curr.value
      moved = true
    } else if (next[axis] !== position) {
      moved = true
      next.move(axis, position)
    }
  }

  return {
    score,
    moved,
  }
}

export const handleMove =
  ({ axis, order }: MovementOptions) =>
  (row: Tile[]) =>
    moveItems(row, axis, order)

export const getMovementOptions = (key: string) => {
  const direction = key
    .replace(/arrow/i, "")
    .toUpperCase() as Uppercase<DirectionType>
  return movementOptions[direction]
}

export const toCoords = (value: number) => ({
  y: Math.floor(value / BOARD_SIZE),
  x: value % BOARD_SIZE,
})

export const toPositionId = ({ x, y }: Record<AxisType, number>): number =>
  y * BOARD_SIZE + x

export const allPositions = Array.from(
  { length: BOARD_SIZE * BOARD_SIZE },
  (_, i) => toCoords(i)
)

export const hasSamePosition = (a: Position, b: Position) =>
  a.x === b.x && a.y === b.y

export const isCellAvailable = (array: Position[], position: Position) =>
  array.every((tile) => !hasSamePosition(position, tile))
