import { v4 as uuidv4 } from "uuid"
import { AxisType, Tile } from "./stores/game.types"
import { Axis } from "./constants"

export const DEFAULT_ROWS = 4

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createTile = (x: number, y: number, value: number): Tile => ({
  value,
  x,
  y,
  merged: false,
  id: uuidv4(),
})

export const splitIntoRows = (
  tiles: Array<Tile>,
  axis: AxisType
): Array<Array<Tile>> => {
  const constAxis = axis === Axis.X ? Axis.Y : Axis.X

  return tiles
    .reduce<Array<Array<Tile>>>(
      (acc, tile) => {
        !tile.merged && acc[tile[axis]].push(tile)
        return acc
      },
      [[], [], [], []]
    )
    .map((row) => row.sort((a, b) => a[constAxis] - b[constAxis]))
}
