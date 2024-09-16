import { GameState, MoveKeyType, Tile } from "./types"
import { computed, toRefs } from "vue"
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
import { createSharedComposable, useStorage } from "@vueuse/core"


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
			if (score.value > best.value) {
				best.value = score.value
			}
		}


		const removeMergedTiles = () => {
			tiles.value = tiles.value.filter(({ merged }) => !merged)
		}


		const reset = () => {
			tiles.value = []
			score.value = 0
		}

		const initGame = () => {
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
			let isUpdated = false
			for (let i = 0; i < BOARD_SIZE; i++) {
				const row = getSortedTiles({ array: tiles.value, index: i, axis, order, groupAxis })
				row.forEach((tile, i) => {
					const prev = row[i - 1]
					const position = !!prev ? prev[axis] + order : firstPosition
					if (!!prev && !prev.merged && tile.value === prev.value) {
						score += mergeTiles(tile, prev)
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

