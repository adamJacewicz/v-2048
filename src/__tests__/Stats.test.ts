import Stats from "../components/Stats.vue"
import { beforeEach, describe, expect } from "vitest"
import { useGame } from "../use-game"
import { fireEvent, render, screen } from "@testing-library/vue"

import "@testing-library/jest-dom"

describe("Stats", () => {
	const game = useGame()
	const spy = vi.spyOn(game, "initGame")

	afterEach(() => {
		game.reset()
		vi.clearAllMocks()
		vi.clearAllTimers()
	})

	beforeEach(() => {
		render(Stats)
		vi.useFakeTimers()
	})

	it("component displays proper values", async () => {
		const score = screen.getByText("score").parentElement
		const best = screen.getByText("best").parentElement
		expect(score).toHaveTextContent("0")
		expect(best).toHaveTextContent("0")
		game.updateScore(8)
		await vi.advanceTimersByTimeAsync(150)
		expect(score).toHaveTextContent("8")
		expect(best).toHaveTextContent("8")
	})

	it("new game button resets current score", async () => {
		const score = screen.getByText("score").parentElement
		const best = screen.getByText("best").parentElement
		const newGameButton = screen.getByRole("button")

		game.updateScore(8)
		await vi.advanceTimersByTimeAsync(150)
		expect(score).toHaveTextContent("8")
		expect(best).toHaveTextContent("8")
		await fireEvent.click(newGameButton)
		await vi.advanceTimersByTimeAsync(150)
		expect(score).toHaveTextContent("0")
		expect(best).toHaveTextContent("8")
		expect(spy).toHaveBeenCalled()
	})
})
