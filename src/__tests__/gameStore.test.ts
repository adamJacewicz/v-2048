import { setActivePinia, createPinia } from "pinia"
import { useGameStore } from "../stores/game"
import { expect } from "vitest"

describe("Game store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("update score", () => {
    const gameStore = useGameStore()
    expect(gameStore.score).toBe(0)
    gameStore.updateScore(4)
    expect(gameStore.score).toBe(4)
  })

  it("init", () => {
    const gameStore = useGameStore()
    gameStore.init()
    expect(gameStore.score).toBe(0)
    expect(gameStore.tiles.length).toBe(2)
  })

  it("add tile", () => {
    const gameStore = useGameStore()
    gameStore.addTile()
    gameStore.addTile()
    expect(gameStore.tiles.length).toBe(2)
  })
})
