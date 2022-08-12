import { v4 as uuidv4 } from "uuid"
import { AxisType, Tile } from "./stores/game.types"
import { Axis } from "./constants"

export const BOARD_SIZE = 4

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createTile = (tile: Pick<Tile, "x" | "y" | "value">): Tile => ({
  ...tile,
  merged: false,
  id: uuidv4(),
  move(axis, value) {
    this[axis] = value
  },
  merge() {
    this.merged = true
  },
  update() {
    this.value *= 2
  },
})

export const generateArray = <T, R = T | (() => T)>(
  length: number = BOARD_SIZE
): Array<T> => [...Array(length)]


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

export const sortAndGroup = (
  tiles: Array<Tile>,
  axis: AxisType,
  desc = false
) => {
  return Object.values(
    groupByAxis(tiles, axis === Axis.X ? Axis.Y : Axis.X)
  ).map((row) => sortByAxis(row, axis, desc))
}
