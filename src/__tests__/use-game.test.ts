import { beforeEach, expect, vi } from "vitest"
import { BOARD_SIZE } from "../constants"
import { allPositions } from "../utils"
import { useGame } from "../use-game"
import { MoveKeyType, Tile } from "../types"

describe("Game state", () => {
  const directions: { direction: MoveKeyType; expected: Partial<Tile>[] }[] = [
    {
      direction: "left",
      expected: [
        { x: 0, y: 2, value: 2, merged: false },
        { x: 1, y: 3, value: 2, merged: false },
        { x: 0, y: 0, value: 4, merged: false },
        { x: 0, y: 3, value: 4, merged: false },
      ],
    },
    {
      direction: "down",
      expected: [
        { x: 2, y: 3, value: 2, merged: true },
        { x: 2, y: 3, value: 4, merged: false },
        { x: 1, y: 3, value: 4, merged: true },
        { x: 1, y: 3, value: 8, merged: false },
      ],
    },
  ]

  const game = useGame()

  const addTileSpy = vi.spyOn(game, "addTile")

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
    move,
  } = game

  const fillBoardWithTiles = (tiles?: Partial<Tile>[]) => {
    if (!tiles) {
      allPositions.forEach((tile, i) => addTile({ ...tile, value: i }))
    } else {
      tiles.forEach(addTile)
    }
  }

  beforeEach(() => {
    reset()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("should update score and best score", () => {
    expect(score.value).toBe(0)
    expect(best.value).toBe(0)
    updateScore(4)
    expect(score.value).toBe(4)
    expect(best.value).toBe(4)
  })

  it("should add tile", async () => {
    const newTiles = [
      { x: 3, y: 3, value: 8, merged: false },
      { x: 2, y: 3, value: 16, merged: true },
    ]
    fillBoardWithTiles(newTiles)
    expect(addTileSpy).toHaveBeenCalledTimes(newTiles.length)
    expect(addTileSpy.mock.calls[0][0]).toEqual(newTiles[0])
    expect(addTileSpy.mock.calls[1][0]).toEqual(newTiles[1])
    expect(tiles.value).toMatchObject(newTiles)
  })

  it("prevent from adding tile when there is no free cells", () => {
    fillBoardWithTiles()
    expect(addTileSpy).toHaveBeenCalledTimes(16)
    expect(tiles.value).toHaveLength(BOARD_SIZE ** 2)
    addTile({ x: 7, y: 7, value: 4 })
    expect(tiles.value).toHaveLength(BOARD_SIZE ** 2)
    expect(availablePositions.value).toHaveLength(0)
  })

  it.each(directions)("moves into %s direction", (scenario) => {
    const { direction, expected } = scenario
    const initial = [
      { x: 2, y: 2, value: 2, merged: false },
      { x: 2, y: 3, value: 2, merged: false },
      { x: 1, y: 0, value: 4, merged: false },
      { x: 1, y: 3, value: 4, merged: false },
    ]

    fillBoardWithTiles(initial)
    move(direction)
    expect(tiles.value).toMatchObject([
      ...expected.map((tile) => ({
        ...tile,
        id: expect.any(String),
      })),
      expect.any(Object),
    ])
  })

  it("remove merged tiles", () => {
    const newTiles = [
      { x: 2, y: 2, merged: false },
      { x: 2, y: 3, merged: true },
      { x: 1, y: 1, merged: true },
    ]
    fillBoardWithTiles(newTiles)
    expect(tiles.value).toHaveLength(3)
    removeMergedTiles()
    expect(tiles.value).toHaveLength(1)
    expect(tiles.value).toContainEqual({
      x: 2,
      y: 2,
      merged: false,
      value: expect.any(Number),
      id: expect.any(String),
    })
  })

  it("gameover when there is no available cells and no tiles to merge", async () => {
    fillBoardWithTiles()
    expect(availablePositions.value).toHaveLength(0)
    expect(isMergePossible.value).toBe(false)
    expect(isGameOver.value).toBe(true)
  })
})
