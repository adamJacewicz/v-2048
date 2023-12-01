import { Order } from "./constants"
import { SwipeDirection } from "@vueuse/core"

export type MaybeTile = Partial<Tile> & Position

export type Tile = {
  value: number
  merged: boolean
  id: string
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

export type AxisType = "x" | "y"

export type direction = "Up" | "Down" | "Right" | "Left"
export type keyType = (`Arrow${direction}` | Uppercase<direction> | "NONE") &
  keyof typeof SwipeDirection | string

export type z<Type, Key extends string & keyof Type> = (
  eventName: `${Key}Changed`,
  callback: (newValue: Type[Key]) => void
) => void
