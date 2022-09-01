import { AxisType, DirectionType, Position, Tile } from "./game.types"
import { Axis, movementOptions, Order } from "./constants"
import { unref } from "vue"

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

export const moveRow = (row: Tile[], axis: AxisType, order: Order) => {
  let score = 0
  let moved = false
  const firstPosition = order === Order.ASC ? 0 : BOARD_SIZE - 1
  order === Order.DESC && row.reverse()
  const arrLength = row.length
  for (let i = -1; i < arrLength - 1; i++) {
    const curr = row[i]
    const next = row[i + 1]
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

export const allPositions = Array.from(
  { length: BOARD_SIZE * BOARD_SIZE },
  (_, i) => toCoords(i)
)

export const hasSamePosition = (a: Position, b: Position) =>
  a.x === b.x && a.y === b.y

export const generateId = () =>
  (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: string) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  )
