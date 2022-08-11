import { createTile, BOARD_SIZE, getRandomInteger, sortByAxis, generateArray } from "../utils"
import { defineStore, acceptHMRUpdate } from "pinia"
import { AxisType, GameState, Tile } from "./game.types"

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
      this.vectors[axis].forEach((vector) => {
        !desc && vector.reverse()
        vector.forEach((tile, i) => {
          const position = tile[axis]
          const last = vector[i - 1]
          if (i === 0) {
            tile.move(axis, desc ? BOARD_SIZE - i - 1 : i)
          } else if (!last.merged && last.value === tile.value) {
            last.update()
            this.updateScore(last.value)
            tile.merge()
            tile.move(axis, last[axis])
          } else {
            tile.move(axis, last[axis] + (desc ? -1 : 1))
          }
          if (tile[axis] !== position) updated = true
        })
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
      const rows = generateArray<Tile[]>(BOARD_SIZE).map((_) => [...Array(0)])
      const cols = generateArray<Tile[]>(BOARD_SIZE).map((_) => [...Array(0)])
      this.tiles.forEach((tile) => {
        if (!tile.merged) {
          const xIndex = rows[tile.y].findIndex((t) => t.x < tile.x)
          xIndex < 0
            ? rows[tile.y].push(tile)
            : rows[tile.y].splice(xIndex, 0, tile)

          const yIndex = cols[tile.x].findIndex((t) => t.y < tile.y)
          yIndex < 0
            ? cols[tile.x].push(tile)
            : cols[tile.x].splice(yIndex, 0, tile)
        }
      })
      return { x: rows, y: cols }
    },
    mergePossible(): boolean {
      return Object.values(this.vectors).flat().some((row) =>
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
