import { AxisType, DirectionType, MovementOptions } from "./game.types"

export enum Order {
  ASC = 1,
  DESC = -1,
}

export const Axis: Record<Uppercase<AxisType>, AxisType> = {
  X: "x",
  Y: "y",
} as const

export const keyList = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]

export const movementOptions: Record<
  Uppercase<DirectionType>,
  MovementOptions
> = {
  UP: { axis: Axis.Y, order: Order.ASC },
  DOWN: { axis: Axis.Y, order: Order.DESC },
  LEFT: { axis: Axis.X, order: Order.ASC },
  RIGHT: { axis: Axis.X, order: Order.DESC },
}
