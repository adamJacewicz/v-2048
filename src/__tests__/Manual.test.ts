import { render, screen } from "@testing-library/vue"
import Manual from "../components/Manual.vue"
import "@testing-library/jest-dom"

describe("Manual", () => {
  it("should render", () => {
    const { container } = render(Manual)

    const text =
      "HOW TO PLAY: Use your arrow keys or swipe to move the tiles. When two tiles with the same number touch, they merge into one!"

    expect(container.textContent).toContain(text)
  })
})
