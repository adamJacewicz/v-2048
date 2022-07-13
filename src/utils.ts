import { v4 as uuidv4 } from "uuid"
import { AxisType, Tile } from "./stores/game.types"
import { Axis } from "./constants"

export const BOARD_SIZE = 4

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createTile = (x: number, y: number, value: number): Tile => ({
  value,
  x,
  y,
  merged: false,
  id: uuidv4(),
})

const sortByAxis = (array: Tile[], axis: AxisType, desc = false) =>
  array.sort((a, b) => (desc ? b[axis] - a[axis] : a[axis] - b[axis]))

const groupByAxis = (array: Tile[], axis: AxisType) =>
  array.reduce<Record<number, Tile[]>>(
    (result, item) => {
      const propValue = item[axis]
      result[propValue] = result[propValue] ?? []
      result[propValue].push(item)
      return result
    },
    [...Array(BOARD_SIZE)].map(() => [])
  )

// export const compose = (...args) => (...a) => args.reduce((prev, curr) => prev(curr(...a)))

export const sortAndGroup = (
  tiles: Array<Tile>,
  axis: AxisType,
  desc = false
) => {
  return Object.values(
    groupByAxis(tiles, axis === Axis.X ? Axis.Y : Axis.X)
  ).map((row) => sortByAxis(row, axis, desc))
}
