import { GameState, MoveKeyType, Tile } from "./types"
import { computed, nextTick, ref, toRefs, unref } from "vue"
import {
	allPositions,
	createTile,
	findNeighbours,
	getCellIndex,
	getMovementOptions,
	getRandomItem, getSortedTiles,
	isPositionExists,
	isValidPosition,
	mergeTiles
} from "./utils"
import { Axis, BOARD_SIZE, Order } from "./constants"
import {
	createSharedComposable,
	useArrayDifference,
	useCloned,
	useStorage,
	watchPausable,
} from "@vueuse/core"


function getInitialState(): GameState {
	return {
		score: 0,
		best: 0,
		tiles: []
	}
}

export const useGame = createSharedComposable(() => {
		const state = useStorage<GameState>("2048", getInitialState(), localStorage, { mergeDefaults: true })
		const { score, best, tiles } = toRefs(state.value)

		const updateScore = (value: number) => {
			score.value += value
			best.value = Math.max(score.value, best.value)
		}

		const removeMergedTiles = () => {
			tiles.value = tiles.value.filter(({ merged }) => !merged)
		}


		const reset = () => {
			tiles.value = []
			score.value = 0
		}

		const initGame = async () => {
			reset()
			addTile()
			addTile()
		}


		const move = (key: MoveKeyType) => {
			removeMergedTiles()
			const { axis, order } = getMovementOptions(key)
			const groupAxis = axis === Axis.X ? Axis.Y : Axis.X
			const firstPosition = order === Order.ASC ? 0 : BOARD_SIZE - 1
			let score = 0
			const { cloned } = useCloned(tiles)
			for (let i = 0; i < BOARD_SIZE; i++) {
				const row = getSortedTiles({ array: cloned.value, index: i, axis, order, groupAxis })
				row.forEach((tile, i) => {
					const prev = row[i - 1]
					const position = !!prev ? prev[axis] + order : firstPosition
					if (!!prev && !prev.merged && tile.value === prev.value) {
						score += prev.value * 2
						mergeTiles(tile, prev)
					} else if (tile[axis] !== position) {
						tile[axis] = position
					}
				})
			}
			const diff = useArrayDifference(cloned.value, tiles.value, (a, b) => Object.keys(a).every(key => a[key] === b[key]))
			tiles.value = cloned.value
			if (diff.value.length) {
				addTile()
			}

			return score
		}

		const addTile = (tile?: Partial<Tile>): void => {
			const newTile = createTile({
				...(tile ?? getRandomItem(availablePositions.value))
			})
			isValidPosition(newTile, tiles.value) && tiles.value.push(newTile)
		}

		const isGameOver = computed(
			() => !isMergePossible.value && availablePositions.value.length === 0
		)

		const availablePositions = computed(() =>
			allPositions.filter((position) => !isPositionExists(position, tiles.value))
		)


		const isMergePossible = computed(() => tiles.value
			.filter((items) => !items.merged)
			.toSorted((a, b) => getCellIndex(a) - getCellIndex(b))
			.some((tile, _, array) => {
				const neighbours = [
					...findNeighbours(array, tile, Axis.Y),
					...findNeighbours(array, tile, Axis.X)
				]
				return !!neighbours.length
			})
		)

		return {
			isMergePossible,
			isGameOver,
			availablePositions,
			addTile,
			reset,
			initGame,
			move,
			removeMergedTiles,
			updateScore,
			score,
			best,
			tiles
		}
	}
)

