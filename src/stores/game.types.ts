import { Order } from "../constants"

export type Tile = {
  x: number
  y: number
  value: number
  merged: boolean
  id: number
  move(axis: AxisType, value: number): void
  update(): void
  merge(): void
}

export type GameState = {
  tiles: Array<Tile>
  score: number
  best: number
}

export type MovementOptions = {
  sortBy: AxisType
  order: Order
  groupBy: AxisType
}

export type DirectionType = "up" | "down" | "left" | "right"
export type AxisType = "x" | "y"
