import { afterEach, expect } from "vitest"
import { BOARD_SIZE, Direction } from "../constants"
import { MaybeTile } from "../game.types"
import { toCoordinates } from "../utils"
import { store } from "../store"

const {
  tiles,
  score,
  best,
  availablePositions,
  isGameOver,
  addTile,
  removeMergedTiles,
  updateScore,
  reset,
  move,
  createTile,
} = store

const maxTiles = BOARD_SIZE * BOARD_SIZE

const fillTiles = (prop: Array<MaybeTile> | number = maxTiles) => {
  const arr =
    typeof prop === "number"
      ? Array.from({ length: prop }, (_, i) => createTile(toCoordinates(i)))
      : prop
  arr.forEach(addTile)
}

describe("Game store", () => {
  afterEach(() => {
    reset()
  })

  it("update score", () => {
    updateScore(4)
    expect(score.value).toBe(4)
    expect(best.value).toBe(4)
  })

  it("add tile", () => {
    addTile({ x: 3, y: 3, value: 8, merged: false, id: "MOCKED-ID-0" })
    addTile({ x: 2, y: 3, value: 16, merged: true, id: "MOCKED-ID-1" })
    expect(tiles.value).toMatchObject([
      { x: 3, y: 3, value: 8, merged: false, id: "MOCKED-ID-0" },
      { x: 2, y: 3, value: 16, merged: true, id: "MOCKED-ID-1" },
    ])
  })

  it("prevent from adding tile when there is no free cells", () => {
    fillTiles(21)
    expect(tiles.value).toHaveLength(16)
    expect(availablePositions.value).toHaveLength(0)
  })

  it("move", () => {
    const initial = [
      { x: 2, y: 2, value: 2, merged: false, id: "MOCKED-ID-0" },
      { x: 2, y: 3, value: 2, merged: false, id: "MOCKED-ID-1" },
      { x: 1, y: 0, value: 4, merged: false, id: "MOCKED-ID-2" },
      { x: 1, y: 3, value: 4, merged: false, id: "MOCKED-ID-3" },
    ]
    const result = [
      { x: 2, y: 3, value: 2, merged: true, id: "MOCKED-ID-0" },
      { x: 2, y: 3, value: 4, merged: false, id: "MOCKED-ID-1" },
      { x: 1, y: 3, value: 4, merged: true, id: "MOCKED-ID-2" },
      { x: 1, y: 3, value: 8, merged: false, id: "MOCKED-ID-3" },
    ]
    fillTiles(initial)
    move(Direction.DOWN)
    result.every((tile, i) => expect(tile).toMatchObject(tiles.value[i]))
  })

  it("remove merged tiles", () => {
    fillTiles([
      { x: 2, y: 2, merged: false },
      { x: 2, y: 3, merged: true },
      { x: 1, y: 1, merged: true },
    ])
    removeMergedTiles()
    expect(tiles.value).toHaveLength(1)
    expect(tiles.value).toMatchObject([{ x: 2, y: 2, merged: false }])
  })

  it("gameover when there is no available cells and no tiles to merge", () => {
    fillTiles(maxTiles)
    tiles.value.map((tile, i) => (tile.value = i))
    expect(isGameOver.value).toBe(true)
  })
})
