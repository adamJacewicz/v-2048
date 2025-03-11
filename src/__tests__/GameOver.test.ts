import GameOver from "../components/GameOver.vue"
import { describe } from "vitest"
import { screen, render } from "@testing-library/vue"
import "@testing-library/jest-dom"

describe("GameOver", () => {
  it("has proper text", () => {
    render(GameOver)
    expect(screen.getByText("Game over!")).toBeInTheDocument()
  })
})
