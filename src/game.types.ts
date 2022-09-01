import { Order } from "./constants"

export type Tile = {
  value: number
  merged: boolean
  id: string
  move(axis: AxisType, value: number): void
  update(): void
  merge(): void
} & Position

export type GameState = {
  tiles: Array<Tile>
  score: number
  best: number
}

export type MovementOptions = {
  axis: AxisType
  order: Order
}

export type Position = {
  x: number
  y: number
}

export type DirectionType = "up" | "down" | "left" | "right"
export type AxisType = "x" | "y"
