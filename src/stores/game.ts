import { createTile, DEFAULT_ROWS, getRandomInteger } from "../utils"
import { defineStore, acceptHMRUpdate } from "pinia"

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
  state: (): GameState => {
    return {
      tiles: [],
      score: 0,
      best: 0,
    }
  },
  actions: {
    init(): void {
      this.tiles = []
      this.score = 0
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
    move(axis: Axis, desc = false): void {
      const constAxis = axis === Axis.X ? Axis.Y : Axis.X
      this.removeMergedTiles()
      const result: Array<Tile> = JSON.parse(JSON.stringify(this.tiles))
      result
        .reduce<Array<Array<Tile>>>(
          (acc, tile) => {
            acc[tile[constAxis]].push(tile)
            return acc
          },
          [[], [], [], []]
        )
        .forEach((row) => {
          row
            .sort((a, b) => (desc ? b[axis] - a[axis] : a[axis] - b[axis]))
            .forEach((tile, i) => {
              const last = row[i - 1]
              if (i === 0) {
                tile[axis] = desc ? DEFAULT_ROWS - i - 1 : i
              } else if (!last.merged && last.value === tile.value) {
                this.updateScore(last.value * 2)
                result.push(createTile(last.x, last.y, last.value * 2))
                last.merged = true
                tile[axis] = last[axis]
                tile.merged = true
              } else {
                tile[axis] = last[axis] + (desc ? -1 : 1)
              }
            })
        })
      this.tiles = result
    },
    addTile(x?: number, y?: number, value: number = 2): void {
      const randomPosition =
        this.availablePositions[
          getRandomInteger(0, this.availablePositions.length - 1)
        ]
      this.tiles.push(
        createTile(x ?? randomPosition.x, y ?? randomPosition.y, value)
      )
    },
  },
  getters: {
    availablePositions(state) {
      const result = []
      for (let x = 0; x < DEFAULT_ROWS; x++) {
        for (let y = 0; y < DEFAULT_ROWS; y++) {
          !state.tiles.some((tile: Tile) => tile.x === x && tile.y === y) &&
            result.push({ x, y })
        }
      }
      return result
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
