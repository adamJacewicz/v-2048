import { expect } from "vitest"
import { use2048 } from "../composables/use-2048"
import { useTile } from "../composables/use-tile"
import { movementOptions } from "../constants"
import { Position, Tile } from "../game.types"
import { BOARD_SIZE, hasSamePosition, toCoords } from "../utils"

describe("Game store", () => {
  const game = use2048()
  const fillTiles = (array: Array<Partial<Tile> & Position>) => {
    array.forEach((item) => game.addTile(useTile(item)))
  }
  beforeEach(() => {
    game.initGame()
  })

  it("update score", () => {
    expect(game.score).toBe(0)
    expect(game.best).toBe(0)
    game.updateScore(4)
    expect(game.score).toBe(4)
    expect(game.best).toBe(4)
  })

  it("add tile", () => {
    game.reset()
    expect(game.tiles).toHaveLength(0)
    game.addTile(useTile({ x: 3, y: 3 }))
    game.addTile(useTile({ x: 2, y: 3 }))
    expect(game.tiles).toHaveLength(2)
  })

  it("won't add new tiles when there are no free cells", () => {
    game.reset()
    expect(game.tiles).toHaveLength(0)
    fillTiles(
      Array.from({ length: 20 }, (_, i) => ({
        ...toCoords(i),
        value: i,
      }))
    )
    expect(game.tiles).toHaveLength(16)
    game.addTile()
    game.addTile()
    game.addTile()
    expect(game.tiles).toHaveLength(16)
    expect(game.availablePositions).toHaveLength(0)
  })

  it("move", () => {
    game.reset()
    fillTiles([
      { x: 2, y: 2, value: 2, merged: false },
      { x: 2, y: 3, value: 2, merged: false },
      { x: 1, y: 0, value: 4, merged: false },
      { x: 1, y: 3, value: 4, merged: false },
    ])
    game.move(movementOptions.DOWN)
    const result = [
      {
        x: 2,
        y: 3,
        value: 2,
        merged: true,
      },
      {
        x: 2,
        y: 3,
        value: 4,
        merged: false,
      },
      { x: 1, y: 3, value: 4, merged: true },
      {
        x: 1,
        y: 3,
        value: 8,
        merged: false,
      },
    ]
    expect(
      result.every((tile) =>
        game.tiles.find(
          ({ merged, value, ...rest }) =>
            hasSamePosition(tile, rest) &&
            tile.value === value &&
            tile.merged === merged
        )
      )
    ).toBeTruthy()
  })

  it("remove merged tiles", () => {
    game.reset()
    fillTiles([
      { x: 2, y: 2, merged: false },
      { x: 2, y: 3, merged: true },
      { x: 1, y: 1, merged: true },
    ])
    expect(game.tiles.filter((item) => item.merged)).toHaveLength(2)
    game.removeMergedTiles()
    expect(game.tiles.filter((item) => item.merged)).toHaveLength(0)
  })

  it("gameover when there is no free cells and any of tiles can't be merged", () => {
    game.reset()
    fillTiles(
      Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => ({
        ...toCoords(i),
        value: i,
      }))
    )
    expect(game.gameOver).toBeTruthy()
  })
})
