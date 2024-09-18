import { describe, expect } from "vitest"
import Tile from "../components/Tile.vue"
import {  render, screen } from "@testing-library/vue"
import "@testing-library/jest-dom"

vi.mock("../constants.ts", async () => ({
	...await vi.importActual("../constants.ts"),
	BOARD_SIZE: 4
}))

describe("Tile", () => {
	beforeAll(() => {
		if (!HTMLDivElement.prototype.animate) {
			HTMLDivElement.prototype.animate = vi.fn()
		}
	})

	it("display proper value", () => {
		render(Tile, {
			props: { x: 2, y: 3, value: 8, merged: false, id: "MOCKED-ID" }
		})
		expect(screen.getByText("8")).toBeInTheDocument()
	})

	it("has proper styles and classes", async () => {
		const { container, rerender } = render(Tile, {
			props: { x: 2, y: 3, value: 4, merged: false, id: "MOCKED-ID" }
		})

		expect(container.firstChild).toHaveClass("w-1/4 h-1/4 text-accent-800")
		expect(screen.getByText("4")).toHaveClass("bg-tile-4")
		expect(container.firstChild).toHaveStyle({ zIndex: 2 })

		await rerender({ x: 2, y: 3, value: 16, merged: false, id: "MOCKED-ID" })
		expect(container.firstChild).toHaveClass("text-accent-50")
		expect(screen.getByText("16")).toHaveClass("bg-tile-16")
		expect(container.firstChild).toHaveStyle({ zIndex: 4 })
		expect(HTMLDivElement.prototype.animate).toHaveBeenCalledTimes(1)
	})
})
