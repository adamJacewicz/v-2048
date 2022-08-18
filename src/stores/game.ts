import {
  allPositions,
  BOARD_SIZE,
  getRandomItem,
  handleMove,
  transformIntoMatrix,
} from "../utils"
import { acceptHMRUpdate, defineStore } from "pinia"
import { AxisType, MovementOptions, Tile } from "./game.types"
import { computed, ref } from "vue"
import { useTile } from "../composables/use-tile"

export const useGame = defineStore("2048", () => {
  const tiles = ref<Tile[]>([])
  const score = ref(0)
  const best = ref(0)

  const reset = () => {
    tiles.value = []
    score.value = 0
    addRandomTile()
    addRandomTile()
  }

  const updateScore = (value: number) => {
    score.value += value
    score.value > best.value && (best.value = score.value)
  }

  const addRandomTile = (): void => {
    if (availablePositions.value.length) {
      const tile = useTile(getRandomItem(availablePositions.value))
      tiles.value.push(tile)
    }
  }

  const removeMergedTiles = () => {
    tiles.value = tiles.value.filter((tile) => !tile.merged)
  }

  const move = (options: MovementOptions): void => {
    if (!options) return
    removeMergedTiles()
    const move = handleMove(options)
    const { points, changed } = transformIntoMatrix(
      tiles.value,
      options.axis
    ).reduce(
      ({ points, changed }, row) => {
        const { score, moved } = move(row)
        return { points: points + score, changed: changed || moved }
      },
      { points: 0, changed: false }
    )
    updateScore(points)
    changed && addRandomTile()
  }

  const gameOver = computed(
    () =>
      availablePositions.value.length === 0 &&
      !transformIntoMatrix(
        tiles.value.filter((tile) => !tile.merged),
        "x"
      )
        .flat()
        .some((tile, i, arr) => {
          const nextTile = arr[i + 1]
          const bottomTile = arr[i + BOARD_SIZE]
          return (
            (nextTile &&
              nextTile.y === tile.y &&
              nextTile.value === tile.value) ||
            (bottomTile && bottomTile.value === tile.value)
          )
        })
  )

  const availablePositions = computed(() =>
    allPositions.reduce<Array<Record<AxisType, number>>>(
      (res, coords) =>
        tiles.value.find((tile) => tile.x === coords.x && tile.y === coords.y)
          ? res
          : [...res, coords],
      []
    )
  )

  return {
    tiles,
    score,
    best,
    gameOver,
    reset,
    move,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGame, import.meta.hot))
}
