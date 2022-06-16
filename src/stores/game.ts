import { createTile, DEFAULT_ROWS, getRandomInteger } from "../utils"
import { defineStore } from "pinia"

export type Tile = {
  x: number
  y: number
  value: number
  merged: boolean
  id: string
}

type GameState = {
  tiles: Array<Tile>
  score: number
  best: number
}

export type Axis = "x" | "y"

export const Axis: Record<"X" | "Y", Axis> = {
  X: "x",
  Y: "y",
}

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
      this.tiles = this.tiles.filter(({ merged }) => !merged)
    },
    move(axis: Axis, desc = false): void {
      const constAxis = axis === Axis.X ? Axis.Y : Axis.X
      this.$patch((state) => {
        this.removeMergedTiles()
        state.tiles
          .reduce<Array<Array<Tile>>>(
            (acc, tile) => {
              acc[tile[constAxis]].push(tile)
              return acc
            },
            [[], [], [], [], []]
          )
          .forEach((row) => {
            row.sort((a, b) => a[axis] - b[axis])
            desc && row.reverse()

            row.forEach((tile, i) => {
              if (i === 0) {
                tile[axis] = desc ? DEFAULT_ROWS - i - 1 : i
              } else {
                const last = row[i - 1]
                if (!last.merged && last.value === tile.value) {
                  this.addTile(last.x, last.y, last.value * 2)
                  this.updateScore(last.value * 2)
                  last.merged = true
                  tile.merged = true
                  tile[axis] = last[axis]
                } else {
                  tile[axis] = last[axis] + (desc ? -1 : 1)
                }
              }
            })
          })
      })
    },
    addTile(x?: number, y?: number, value: number = 2): void {
      const randomPosition =
        this.freeSlots[getRandomInteger(0, this.freeSlots.length - 1)]
      const newTile = createTile(
        x ?? randomPosition.x,
        y ?? randomPosition.y,
        value
      )
      this.tiles.push(newTile)
    },
  },
  getters: {
    freeSlots() {
      const result = []
      for (let x = 0; x < DEFAULT_ROWS; x++) {
        for (let y = 0; y < DEFAULT_ROWS; y++) {
          !this.tiles.some((tile) => tile.x === x && tile.y === y) &&
            result.push({ x, y })
        }
      }
      return result
    },
  },
  persist: true,
})
