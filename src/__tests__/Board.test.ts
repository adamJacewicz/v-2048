import { describe, expect, Mock } from "vitest"
import Board from "../components/Board.vue"
import { useGame } from "../use-game"
import { render, screen, waitFor } from "@testing-library/vue"
import "@testing-library/jest-dom"

vi.mock('../use-game', () => ({
	useGame: vi.fn()
}))

describe("Board", () => {
	beforeEach(() => {
		(useGame as Mock).mockReturnValue({
			tiles: [
				{ id: 1, value: 2, x: 0, y: 0 },
				{ id: 2, value: 4, x: 1, y: 1 }
			]
		})
	})

	it("render tiles", async () => {
		render(Board)
		await waitFor(() => {
			expect(screen.getByText("2")).toBeInTheDocument()
			expect(screen.getByText("4")).toBeInTheDocument()
		})
	})
})