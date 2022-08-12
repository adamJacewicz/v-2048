import { Order } from "../constants"

export type Tile = {
  x: number
  y: number
  value: number
  merged: boolean
  id: string
  move(axis: AxisType, value: number): void
  update(): void
  merge(): void
}

export type GameState = {
  tiles: Array<Tile>
  score: number
  best: number
}
export type MovementOptions = { axis: AxisType; order: Order }

export type DirectionType = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
export type AxisType = "x" | "y"
