import { setActivePinia, createPinia } from "pinia"
import { useGame } from "../stores/game"
import { expect } from "vitest"

describe("Game store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("update score", () => {
    const game = useGame()
    expect(game.score).toBe(0)
    game.updateScore(4)
    expect(game.score).toBe(4)
  })

  it("reset", () => {
    const game = useGame()
    game.reset()
    expect(game.score).toBe(0)
    expect(game.tiles.length).toBe(2)
  })

  it("add tile", () => {
    const game = useGame()
    game.addRandomTile()
    game.addRandomTile()
    expect(game.tiles.length).toBe(2)
  })
})
