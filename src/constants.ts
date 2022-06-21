import { AxisType } from "./stores/game.types"

export const Axis: Record<Uppercase<AxisType>, AxisType> = {
  X: "x",
  Y: "y",
} as const

export type DirectionType = "Up" | "Down" | "Left" | "Right"

export const directionParameters: Record<
  Uppercase<DirectionType>,
  { axis: typeof Axis[keyof typeof Axis]; desc: boolean }
> = {
  UP: { axis: Axis.Y, desc: false },
  DOWN: { axis: Axis.Y, desc: true },
  LEFT: { axis: Axis.X, desc: false },
  RIGHT: { axis: Axis.X, desc: true },
}
