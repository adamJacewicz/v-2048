import {
  createTile,
  BOARD_SIZE,
  getRandomInteger,
  sortAndGroup,
} from "../utils"
import { defineStore, acceptHMRUpdate } from "pinia"
import { AxisType, GameState, Tile } from "./game.types"
import { Axis } from "../constants"

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
    move(axis: AxisType, desc = false): void {
      this.removeMergedTiles()
      let updated = false
      sortAndGroup(this.tiles, axis, desc).forEach((row) =>
        row.forEach((tile, i) => {
          const position = tile[axis]
          const last = row[i - 1]
          if (i === 0) {
            tile.move(axis, desc ? BOARD_SIZE - i - 1 : i)
          } else if (!last.merged && last.value === tile.value) {
            tile.merge()
            tile.move(axis, last[axis])
            last.update()
            this.updateScore(last.value)
          } else {
            tile.move(axis, last[axis] + (desc ? -1 : 1))
          }
          if (tile[axis] !== position) updated = true
        })
      )
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
    mergePossible(): boolean {
      const tiles: Tile[] = JSON.parse(JSON.stringify(this.tiles))
      return [
        ...sortAndGroup(tiles, Axis.X),
        ...sortAndGroup(tiles, Axis.Y),
      ].some((row) =>
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
