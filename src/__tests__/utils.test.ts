import { describe, expect } from "vitest"
import {
	generateTranslationClass,
	hasProperties,
	isInRange,
	getCoordinates,
	getCellIndex,
	hasSamePosition,
	mergeTiles,
	createTile,
	getRandomInteger,
	getRandomItem,
	isPositionExists, isValidPosition
} from "../utils"
import { Axis } from "../constants"

vi.mock("../constants.ts", async () => {
	return {
		...await vi.importActual("../constants.ts"),
		BOARD_SIZE: 4
	}
})


describe("generateTranslationClass", () => {
	it("returns empty string if value is 0", () => {
		expect(generateTranslationClass(Axis.X, 0)).toBe("")
	})

	it("returns proper class", () => {
		expect(generateTranslationClass(Axis.X, 1)).toBe("translate-x-full")
		expect(generateTranslationClass(Axis.Y, 1)).toBe("translate-y-full")
		expect(generateTranslationClass(Axis.X, 2)).toBe("translate-x-2x-full")
		expect(generateTranslationClass(Axis.Y, 2)).toBe("translate-y-2x-full")
	})
})

describe("inRange", () => {
	it("returns false if value is not in range", () => {
		expect(isInRange(2, 3, 5)).toBe(false)
		expect(isInRange(5, 4, 5)).toBe(false)
	})

	it("returns true if value is in range", () => {
		expect(isInRange(3, 2, 5)).toBe(true)
	})
})

describe("hasProperties", () => {
	const object = {
		x: 2,
		y: 2,
		mockedProperty: "mocked string"
	}

	it("returns false if at least one passed property doesn't exists", () => {
		expect(hasProperties(object, "x", "value")).toBe(false)
	})

	it("returns true if all passed properties exists", () => {
		expect(hasProperties(object, "x", "mockedProperty")).toBe(true)
	})
})

describe("getCoordinates and getCellIndex", () => {
	it("getCoordinates converts a cell number into its coordinates and getCellIndex does opposite", () => {
		expect(getCoordinates(7)).toEqual({ x: 3, y: 1 })
		expect(getCoordinates(15)).toEqual({ x: 3, y: 3 })
		expect(getCellIndex({ x: 3, y: 1 })).toEqual(7)
		expect(getCellIndex({ x: 3, y: 3 })).toEqual(15)
	})
})

describe("hasSamePosition", () => {
	it("return true if both tiles are on the same position otherwise return false", () => {
		expect(hasSamePosition({ x: 1, y: 3 }, { x: 1, y: 3 })).toEqual(true)
		expect(hasSamePosition({ x: 1, y: 3 }, { x: 2, y: 3 })).toEqual(false)
	})
})

describe("mergeTiles", () => {
	it("source tile should be updated and target tile value should be doubled", () => {
		const source = createTile({ value: 4, merged: false, x: 3, y: 2 })
		const target = createTile({ value: 4, merged: false, x: 2, y: 2 })
		mergeTiles(source, target)
		expect(source).toMatchObject({ x: target.x, y: target.y, merged: true })
		expect(target).toMatchObject({ value: 8 })
	})
})

describe("getRandomInteger", () => {
	it("should return an integer from the specified range", () => {
		const result = getRandomInteger(12, 20)
		expect(result).toBeLessThanOrEqual(20)
		expect(result).toBeGreaterThanOrEqual(12)
	})
})

describe("getRandomItem", () => {
	it("should return a random item from given array", () => {
		const array = ["mock-1", 1, null, 55]
		const result = getRandomItem(array)
		expect(array.includes(result!)).toBe(true)
	})

	it("should return undefined if given array is empty", () => {
		const result = getRandomItem([])
		expect(result).toBe(undefined)
	})
})

describe("isPositionExists", () => {
	it("should return true if element with given position already exists, otherwise return false", () => {
		const position1 = { x: 1, y: 3 }
		const position2 = { x: 0, y: 3 }
		const array = [position1, position2]
		expect(isPositionExists(position1, array)).toBe(true)
		expect(isPositionExists(position2, [position1])).toBe(false)
	})
})

describe("isValidPosition", () => {
	const array = [
		{ x: 2, y: 2, value: 2, merged: false, id: "MOCKED-ID-0" },
		{ x: 2, y: 3, value: 2, merged: false, id: "MOCKED-ID-1" },
		{ x: 1, y: 0, value: 4, merged: false, id: "MOCKED-ID-2" },
		{ x: 1, y: 3, value: 4, merged: false, id: "MOCKED-ID-3" }
	]

	it("should return true if the item is within the range and has the correct keys, otherwise return false", () => {
		expect(isValidPosition({ x: 3, y: 3 }, array)).toBe(true)
		expect(isValidPosition({ x: 1, y: 3 }, array)).toBe(false)
		expect(isValidPosition({ x: 6, y: 0 }, array)).toBe(false)
	})
})
