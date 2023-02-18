import { afterEach, expect } from "vitest"
import use2048 from "../composables/use-2048"
import { Direction } from "../constants"
import { MaybeTile } from "../game.types"
import { BOARD_SIZE, toCoords } from "../utils"

describe("Game store", () => {
  const maxTiles = BOARD_SIZE * BOARD_SIZE
  const game = use2048()
  const fillTiles = (
    array: Array<MaybeTile> = Array(BOARD_SIZE * BOARD_SIZE).fill(undefined)
  ) => {
    array.forEach((item) => game.addTile(item))
  }
  afterEach(() => {
    game.reset()
  })

  it("update score", () => {
    game.updateScore(4)
    expect(game.score).toBe(4)
    expect(game.best).toBe(4)
  })

  it("add tile", () => {
    game.addTile({ x: 3, y: 3 })
    game.addTile({ x: 2, y: 3 })
    expect(game.tiles).toMatchObject([
      { x: 3, y: 3 },
      { x: 2, y: 3 },
    ])
  })

  it("won't add new tiles when there are no free cells", () => {
    for (let i = 0; i < maxTiles + 5; i++) {
      game.addTile()
    }
    expect(game.tiles).toHaveLength(16)
    expect(game.availablePositions).toHaveLength(0)
  })

  it("move", () => {
    const initial = [
      { x: 2, y: 2, value: 2, merged: false },
      { x: 2, y: 3, value: 2, merged: false },
      { x: 1, y: 0, value: 4, merged: false },
      { x: 1, y: 3, value: 4, merged: false },
    ]
    const result = [
      { x: 2, y: 3, value: 2, merged: true },
      { x: 2, y: 3, value: 4, merged: false },
      { x: 1, y: 3, value: 4, merged: true },
      { x: 1, y: 3, value: 8, merged: false },
      {},
    ]

    fillTiles(initial)
    game.move(Direction.DOWN)
    expect(game.tiles).toMatchObject(result)
  })

  it("remove merged tiles", () => {
    fillTiles([
      { x: 2, y: 2, merged: false },
      { x: 2, y: 3, merged: true },
      { x: 1, y: 1, merged: true },
    ])
    game.removeMergedTiles()
    expect(game.tiles).toMatchObject([{ x: 2, y: 2, merged: false }])
  })

  it("gameover when there is no free cells and any of tiles can't be merged", () => {
    for (let i = 0; i < maxTiles; i++) {
      game.addTile({ value: i, ...toCoords(i) })
    }
    expect(game.isGameOver).toBe(true)
  })
})
