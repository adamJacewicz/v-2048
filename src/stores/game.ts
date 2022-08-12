import {
  BOARD_SIZE,
  createTile,
  getRandomInteger,
  sortAndGroup,
} from "../utils"
import { acceptHMRUpdate, defineStore } from "pinia"
import { AxisType, GameState, Tile } from "./game.types"
import { Axis, Order } from "../constants"

export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    tiles: [],
    score: 0,
    best: 0,
  }),
  actions: {
    init(): void {
      this.tiles = []
      this.score = 0
      this.addTile()
      this.addTile()
    },
    updateScore(value: number): void {
      this.score += value
      if (this.score > this.best) {
        this.best = this.score
      }
    },
    removeMergedTiles(): void {
      this.tiles = this.tiles.filter((tile) => !tile.merged)
    },
    move(axis: AxisType, order: Order): void {
      this.removeMergedTiles()
      let updated = false
      this.vectors[axis].forEach((row) => {
        order === Order.DESC && row.reverse()
        row.reduce<Tile | null>((last, tile, i) => {
          const position = tile[axis]
          if (!last) {
            tile.move(axis, order === Order.DESC ? BOARD_SIZE - i - 1 : i)
          } else if (!!last && !last.merged && last.value === tile.value) {
            tile.merge()
            tile.move(axis, last[axis])
            last.update()
            this.updateScore(last.value)
          } else {
            tile.move(axis, last[axis] + order)
          }
          if (tile[axis] !== position) updated = true
          return tile
        }, null)
      })
      updated && this.addTile()
    },
    addTile(tile?: Pick<Tile, "x" | "y" | "value">): void {
      const index = getRandomInteger(0, this.availablePositions.length - 1)
      const newTile = createTile(
        tile ?? { ...this.availablePositions[index], value: 2 }
      )
      this.tiles.push(newTile)
    },
  },
  getters: {
    vectors(): Record<AxisType, Tile[][]> {
      return {
        x: sortAndGroup(this.tiles, Axis.X, Axis.Y, Order.ASC),
        y: sortAndGroup(this.tiles, Axis.Y, Axis.X, Order.ASC),
      }
    },
    mergePossible(): boolean {
      return [...this.vectors.x, ...this.vectors.y].some((row) =>
        row.some((tile, i, row) => i !== 0 && tile.value === row[i - 1].value)
      )
    },
    availablePositions(state): Record<AxisType, number>[] {
      return Array(BOARD_SIZE * BOARD_SIZE)
        .fill(0)
        .reduce((res, item, index) => {
          const y = Math.floor(index / BOARD_SIZE)
          const x = index % BOARD_SIZE
          !state.tiles.some((tile: Tile) => tile.x === x && tile.y === y) &&
            res.push({ x, y })
          return res
        }, [])
    },
  },
  persist: false,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
