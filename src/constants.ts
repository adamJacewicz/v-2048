import { AxisType, DirectionType, MovementOptions } from "./stores/game.types"

export enum Order {
  ASC = 1,
  DESC = -1,
}

export const Axis: Record<Uppercase<AxisType>, AxisType> = {
  X: "x",
  Y: "y",
} as const

export const movementOptions: Record<DirectionType, MovementOptions> = {
  ArrowUp: { axis: Axis.Y, order: Order.ASC },
  ArrowDown: { axis: Axis.Y, order: Order.DESC },
  ArrowLeft: { axis: Axis.X, order: Order.ASC },
  ArrowRight: { axis: Axis.X, order: Order.DESC },
}
