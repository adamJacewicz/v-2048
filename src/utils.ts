import { v4 as uuidv4 } from "uuid"
import {  Tile } from "./stores/game.types"
import { Order } from "./constants"

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


const sortBy = <T extends Record<PropertyKey, any>>(
  array: T[],
  key: keyof T,
  order: Order
): T[] => array.sort((a: T, b: T) => order * (a[key] - b[key]))

const groupBy = <T extends Record<PropertyKey, any>>(
  array: T[],
  key: keyof T
): Record<T[keyof T], T[]> =>
  array.reduce((result, item) => {
    const value = item[key]
    result[value] ||= []
    result[value].push(item)
    return result
  }, {} as Record<T[keyof T], T[]>)

export const sortAndGroup = <T>(
  tiles: T[],
  sortKey: keyof T,
  groupKey: keyof T,
  order: Order
) =>
  Object.values<T[]>(groupBy(tiles, groupKey)).map((row) =>
    sortBy(row, sortKey, order)
  )
