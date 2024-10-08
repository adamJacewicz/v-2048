import { beforeEach, expect } from "vitest"
import { BOARD_SIZE } from "../constants"
import { allPositions } from "../utils"
import { useGame } from "../use-game"


const {
	score,
	tiles,
	best,
	availablePositions,
	isGameOver,
	isMergePossible,
	addTile,
	removeMergedTiles,
	updateScore,
	reset,
	move
} = useGame()

describe("Game state", () => {
	beforeEach(() => {
		reset()
	})

	it("updates score and best", () => {
		expect(score.value).toBe(0)
		expect(best.value).toBe(0)
		updateScore(4)
		expect(score.value).toBe(4)
		expect(best.value).toBe(4)
	})

	it("add tile", () => {
		const newTiles = [
			{ x: 3, y: 3, value: 8, merged: false, id: "MOCKED-ID-0" },
			{ x: 2, y: 3, value: 16, merged: true, id: "MOCKED-ID-1" }
		]
		newTiles.forEach(addTile)
		expect(tiles.value).toMatchObject(newTiles)
	})

	it("prevent from adding tile when there is no free cells", () => {
		allPositions.forEach(addTile)
		addTile({ x: 7, y: 7, value: 4 })
		expect(tiles.value).toHaveLength(BOARD_SIZE ** 2)
		expect(availablePositions.value).toHaveLength(0)
	})

	it("moves into right direction", () => {
		const initial = [
			{ x: 2, y: 2, value: 2, merged: false, id: "MOCKED-ID-0" },
			{ x: 2, y: 3, value: 2, merged: false, id: "MOCKED-ID-1" },
			{ x: 1, y: 0, value: 4, merged: false, id: "MOCKED-ID-2" },
			{ x: 1, y: 3, value: 4, merged: false, id: "MOCKED-ID-3" }
		]

		const resultDown = [
			{ x: 2, y: 3, value: 2, merged: true, id: "MOCKED-ID-0" },
			{ x: 2, y: 3, value: 4, merged: false, id: "MOCKED-ID-1" },
			{ x: 1, y: 3, value: 4, merged: true, id: "MOCKED-ID-2" },
			{ x: 1, y: 3, value: 8, merged: false, id: "MOCKED-ID-3" }
		]

		const resultLeft = [
			{ x: 0, y: 2, value: 2, merged: false, id: "MOCKED-ID-0" },
			{ x: 1, y: 3, value: 2, merged: false, id: "MOCKED-ID-1" },
			{ x: 0, y: 0, value: 4, merged: false, id: "MOCKED-ID-2" },
			{ x: 0, y: 3, value: 4, merged: false, id: "MOCKED-ID-3" }
		]

		initial.forEach(addTile)
		move("down")
		expect({tiles: tiles.value}).toEqual({tiles: expect.arrayContaining(resultDown)})
		reset()
		initial.forEach(addTile)
		move("left")
		expect({tiles: tiles.value}).toEqual({tiles: expect.arrayContaining(resultLeft)})

	})

	it("remove merged tiles", () => {
		const newTiles = [
			{ x: 2, y: 2, merged: false },
			{ x: 2, y: 3, merged: true },
			{ x: 1, y: 1, merged: true }
		]
		newTiles.forEach(addTile)
		removeMergedTiles()
		expect(tiles.value).toHaveLength(1)
		expect(tiles.value).toMatchObject([{ x: 2, y: 2, merged: false }])
	})

	it("gameover when there is no available cells and no tiles to merge", async () => {
		allPositions.forEach((tile, i) => addTile({ ...tile, value: i }))
		expect(availablePositions.value).toHaveLength(0)
		expect(isMergePossible.value).toBe(false)
		expect(isGameOver.value).toBe(true)
	})
})
