import { AxisType, keyType, Position, Tile } from "./types"
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
  const direction = Object.keys(movementOptions).find((directionKey) =>
    key.toUpperCase().includes(directionKey)
  ) as keyof typeof movementOptions
  return movementOptions[direction]
}

export const getCoordinates = (value: number) => ({
  y: Math.floor(value / BOARD_SIZE),
  x: value % BOARD_SIZE,
})

export const getCellIndex = ({ x, y }: Position) => x + BOARD_SIZE * y

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
  value: T,
  start: T,
  end: T
) => {
  if (start > end) [end, start] = [start, end]
  return value >= start && value < end
}

export const hasProperties = <T extends {}>(
  object: T,
  ...keys: Array<string>
) => keys.every((key) => Object.hasOwn(object, key))

export const allPositions = Array.from(
  { length: BOARD_SIZE * BOARD_SIZE },
  (_, i) => getCoordinates(i)
)

export const generateTranslationClass = (axis: AxisType, value: number) => {
  if (value === 0) return ""
  if (value === 1) return `translate-${axis}-full`
  return `translate-${axis}-${value}x-full`
}

export const createTile = ({
  value = Math.random() < 0.8 ? 2 : 4,
  merged = false,
  id = generateId(),
  x = getRandomInteger(0, BOARD_SIZE - 1),
  y = getRandomInteger(0, BOARD_SIZE - 1),
}: Partial<Tile>) => ({
  value,
  merged,
  id,
  x,
  y,
})

export const isPositionExists = (position: Position, tiles: Tile[]) =>
  tiles.some((tile) => hasSamePosition(tile, position))

export const isValidPosition = (position: Position) =>
  hasProperties(position, "x", "y") &&
  inRange(position.x, 0, BOARD_SIZE) &&
  inRange(position.y, 0, BOARD_SIZE)
