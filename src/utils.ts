import { Direction, MoveKeyType, Position, Tile } from "./types"
import { Axis, BOARD_SIZE, movementOptions, Order } from "./constants"

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
	return target.value
}

export function normalizeDirection(direction: MoveKeyType): Direction {
	return direction.replace(/arrow/gi, "").toUpperCase() as Direction
}

export const getMovementOptions = (key: MoveKeyType) => {
	return movementOptions[normalizeDirection(key)]
}

export const getCoordinates = (value: number) => ({
	y: Math.floor(value / BOARD_SIZE),
	x: value % BOARD_SIZE
})


export const hasSamePosition = (a: Position, b: Position) =>
	a.x === b.x && a.y === b.y

export const generateId = () =>
	crypto.randomUUID()

export const isInRange = (
	value: number,
	end = BOARD_SIZE,
	start = 0
) => {
	if (start > end) [end, start] = [start, end]
	return value >= start && value < end
}

export const hasProperties = <T extends {}>(
	object: T,
	...keys: Array<string>
) => keys.every((key) => Object.hasOwn(object, key))


export const generateTranslationClass = (axis: Axis, value: number) => {
	if (value === 0) return ""
	if (value === 1) return `translate-${axis}-full`
	return `translate-${axis}-${value}x-full`
}

export const createTile = ({
	                           value = Math.random() < 0.8 ? 2 : 4,
	                           merged = false,
	                           id = generateId(),
	                           x = getRandomInteger(0, BOARD_SIZE - 1),
	                           y = getRandomInteger(0, BOARD_SIZE - 1)
                           }: Partial<Tile>) => ({
	value,
	merged,
	id,
	x,
	y
})

export const isPositionExists = (coords: Position, positions: Position[]) =>
	positions.some((pos) => hasSamePosition(pos, coords))


export const getCellIndex = ({ x, y }: Position) => x + BOARD_SIZE * y

export const allPositions = Array.from(
	{ length: BOARD_SIZE ** 2 },
	(_, i) => getCoordinates(i)
)

export const findNeighbours = (tiles: Tile[], tile: Tile, axis: Axis) => {
	const sameAxisTiles = tiles.filter((t) => t[axis] === tile[axis])
	const tileIndex = sameAxisTiles.findIndex(({ id }) => id === tile.id)

	return [sameAxisTiles[tileIndex - 1], sameAxisTiles[tileIndex + 1]]
		.filter((t) => t?.value === tile.value)
}

export const isValidPosition = (position: Position, tiles: Tile[]) =>
	hasProperties(position, "x", "y") &&
	isInRange(position.x, BOARD_SIZE) &&
	isInRange(position.y, BOARD_SIZE) &&
	!isPositionExists(position, tiles)


export const getSortedTiles = ({ array, index, groupAxis, axis, order }: {
	index: number,
	axis: Axis,
	order: Order,
	groupAxis: Axis,
	array: Tile[]
}) => {
	return array
		.filter(tile => tile[groupAxis] === index)
		.sort((a, b) => (a[axis] - b[axis]) * order)
}
