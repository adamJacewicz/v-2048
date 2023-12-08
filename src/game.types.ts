import { Order } from "./constants"
import { SwipeDirection } from "@vueuse/core"
import { useStore } from "./use-game"

export type MaybeTile = Partial<Tile> & Position

export type Tile = {
  value: number
  merged: boolean
  id: string
} & Position


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



export type GameStore = ReturnType<typeof useStore>