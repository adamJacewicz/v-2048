import {
  BOARD_SIZE,
  createTile,
  getRandomInteger,
  initializeArrayWithRange,
  moveItems,
  sortAndGroup,
} from "../utils"
import { acceptHMRUpdate, defineStore } from "pinia"
import { AxisType, GameState, MovementOptions, Tile } from "./game.types"
import { computed, ref } from "vue"

export const useGame = defineStore(
  "2048",
  () => {
    const tiles = ref<Tile[]>([])
    const score = ref(0)
    const best = ref(0)
    const reset = () => {
      tiles.value = [randomTile(), randomTile()]
      score.value = 0
    }

    const updateScore = (value: number) => {
      score.value += value
      score.value > best.value && (best.value = score.value)
    }

    const randomTile = (tile?: Pick<Tile, "x" | "y" | "value">): Tile => {
      const index = getRandomInteger(0, availablePositions.value.length - 1)

      return createTile(
        tile ?? { ...availablePositions.value[index], value: 2 }
      )
    }

    const removeMergedTiles = () => {
      tiles.value = tiles.value.filter((tile) => !tile.merged)
    }

    const mergePossible = computed(() => true)

    const availablePositions = computed(() =>
      initializeArrayWithRange(BOARD_SIZE * BOARD_SIZE, 0).reduce<
        Array<Record<AxisType, number>>
      >((res, item) => {
        const y = Math.floor(item / BOARD_SIZE)
        const x = item % BOARD_SIZE
        !tiles.value.some((tile: Tile) => tile.x === x && tile.y === y) &&
          res.push({ x, y })
        return res
      }, [])
    )

    const move = ({ sortBy, groupBy, order }: MovementOptions): void => {
      removeMergedTiles()

      const changes = sortAndGroup(tiles.value, { sortBy, groupBy, order })
        .map((row) => moveItems(row, sortBy, order))
        .flat()
      let score = 0
      tiles.value = tiles.value.map((tile) => {
        const updatedTile =
          changes.find((change) => tile.id === change.id) ?? tile
        tile.value !== updatedTile.value && (score += updatedTile.value)
        return updatedTile
      })
      updateScore(score)
      !!changes.length && tiles.value.push(randomTile())
    }

    return {
      tiles,
      score,
      best,
      mergePossible,
      availablePositions,
      reset,
      updateScore,
      removeMergedTiles,
      move,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}
