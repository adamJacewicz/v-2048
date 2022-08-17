import { AxisType, DirectionType, MovementOptions } from "./stores/game.types"

export enum Order {
  ASC = 1,
  DESC = -1,
}

export const Axis: Record<Uppercase<AxisType>, AxisType> = {
  X: "x",
  Y: "y",
} as const

export const movementOptions: Record<Uppercase<DirectionType>, MovementOptions> = {
  UP: { groupBy: Axis.X, sortBy: Axis.Y, order: Order.ASC },
  DOWN: { groupBy: Axis.X, sortBy: Axis.Y, order: Order.DESC },
  LEFT: { groupBy: Axis.Y, sortBy: Axis.X, order: Order.ASC },
  RIGHT: { groupBy: Axis.Y, sortBy: Axis.X, order: Order.DESC },
}
