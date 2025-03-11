import Stats from "../components/Stats.vue"
import { beforeEach, describe, expect, vi } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/vue"
import { useGame } from "../use-game"
import "@testing-library/jest-dom"

describe("Stats", () => {
  const game = useGame()
  const spy = vi.spyOn(game, "initGame")

  afterEach(() => {
    game.reset()
  })

  beforeEach(() => {
    render(Stats)
  })

  it("component displays proper values", async () => {
    const [scoreItem, bestItem] = screen.getAllByRole("listitem")

    expect(scoreItem).toHaveTextContent("0")
    expect(bestItem).toHaveTextContent("0")
    game.updateScore(8)

    await waitFor(() => {
      expect(scoreItem).toHaveTextContent("8")
      expect(bestItem).toHaveTextContent("8")
    })
  })

  it("new game button resets current score", async () => {
    const [scoreItem, bestItem] = screen.getAllByRole("listitem")
    const newGameButton = screen.getByRole("button")

    game.updateScore(8)
    await waitFor(() => {
      expect(scoreItem).toHaveTextContent("8")
      expect(bestItem).toHaveTextContent("8")
    })
    await fireEvent.click(newGameButton)
    await waitFor(() => {
      expect(scoreItem).toHaveTextContent("0")
      expect(bestItem).toHaveTextContent("8")
    })
    expect(spy).toHaveBeenCalledOnce()
  })
})
