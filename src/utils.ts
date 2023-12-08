import { keyType, Position, Tile } from "./game.types"
import { BOARD_SIZE, movementOptions } from "./constants"

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomItem = <T>(array: T[]): T | undefined => {
  if (array.length) return array[getRandomInteger(0, array.length - 1)]
}

export const mergeTiles = (source: Tile, target: Tile) => {
  source.x = target.x
  source.y = target.y
  source.merged = true
  target.value *= 2
}

export const getMovementOptions = (key: keyType) => {
  const direction = Object.keys(movementOptions).find((k) =>
    key.toUpperCase().includes(k)
  ) as keyof typeof movementOptions
  return movementOptions[direction]
}

export const toCoordinates = (value: number) => ({
  y: Math.floor(value / BOARD_SIZE),
  x: value % BOARD_SIZE,
})

export const getTileOrder = ({ x, y }: Position) => x + BOARD_SIZE * y

export const hasSamePosition = (a: Position, b: Position) =>
  a.x === b.x && a.y === b.y

export const generateId = () =>
  (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: string) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  )

export const inRange = <T extends number | Date | string>(
  n: T,
  start: T,
  end?: T
) => {
  if (end && start > end) [end, start] = [start, end]
  return end === undefined ? n >= 0 && n < start : n >= start && n < end
}

export const board = Array.from(
  { length: BOARD_SIZE * BOARD_SIZE },
  (_, i) => toCoordinates(i)
)

export const createTile = ({ value, merged, id, x, y }: Partial<Tile>) => ({
  value: value ?? (Math.random() < 0.8 ? 2 : 4),
  merged: merged ?? false,
  id: id ?? generateId(),
  x: x ?? getRandomInteger(0, BOARD_SIZE - 1),
  y: y ?? getRandomInteger(0, BOARD_SIZE - 1)
})

