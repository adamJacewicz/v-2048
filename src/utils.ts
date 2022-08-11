import { v4 as uuidv4 } from "uuid"
import { Tile } from "./stores/game.types"

export const BOARD_SIZE = 4

export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createTile = (tile: Pick<Tile, "x" | "y" | "value">): Tile => ({
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
  ...tile,
})

export const generateArray = <T, R = T | (() => T)>(
  length: number = BOARD_SIZE
): Array<T> => [...Array(length)]
