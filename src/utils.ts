import { v4 as uuidv4 } from "uuid"
import { Tile } from "./stores/game"

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
