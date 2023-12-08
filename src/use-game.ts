import { keyType, MaybeTile, Position, Tile } from "./game.types"
import { computed, ref } from "vue"
import {
	getRandomItem,
	hasSamePosition,
	getMovementOptions,
	inRange,
	mergeTiles,
	getTileOrder,
	board, createTile
} from "./utils"
import { Axis, BOARD_SIZE, Order } from "./constants"


export const useGame = () => {
	const tiles = ref<Tile[]>([])
	const score = ref(0)
	const best = ref(0)
	const updateScore = (value: number) => {
		score.value += value
		score.value > best.value && (best.value = score.value)
	}

	const removeMergedTiles = () => {
		tiles.value = tiles.value.filter(({ merged }) => !merged)
	}

	const isValidPosition = (position: Position) =>
		inRange(position.x, 0, BOARD_SIZE) &&
		inRange(position.y, 0, BOARD_SIZE) &&
		!tiles.value.some((tile) => hasSamePosition(tile, position))

	const reset = () => {
		tiles.value = []
		score.value = 0
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
			const row = tiles.value
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
			...tile
		})
		isValidPosition(newTile) && tiles.value.push(newTile)
	}

	const isGameOver = computed(
		() => !isMergePossible.value && availablePositions.value.length === 0
	)

	const availablePositions = computed(() =>
		board.filter((coords) => isValidPosition(coords))
	)

	const isMergePossible = computed(() =>
		tiles.value
			.filter((items) => !items.merged)
			.sort((a, b) => getTileOrder(a) - getTileOrder(b))
			.some((tile, i, arr) => {
				const nextTile = arr.slice(i + 1).find(({ y }) => y === tile.y)
				const bottomTile = arr
					.slice(i + BOARD_SIZE)
					.find(({ x }) => x === tile.x)
				return (
					(nextTile?.value === tile.value) ||
					(bottomTile?.value === tile.value)
				)
			})
	)

	return {
		score,
		best,
		tiles,
		isMergePossible,
		isGameOver,
		availablePositions,
		addTile,
		reset,
		initGame,
		move,
		removeMergedTiles,
		updateScore
	}
}


