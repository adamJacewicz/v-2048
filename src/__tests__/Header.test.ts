import { render } from "@testing-library/vue"
import Header from "../components/Header.vue"

describe("Header", () => {
  it("should render", () => {
    const { container } = render(Header)

    const text = "Join the tiles, get to 2048!"
    expect(container.textContent).toContain(text)
  })
})
