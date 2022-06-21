import { Axis } from "./stores/game"

export type DirectionType = "Up" | "Down" | "Left" | "Right"

export const directionParameters: Record<
  DirectionType,
  { axis: Axis; desc: boolean }
> = {
  Up: { axis: Axis.Y, desc: false },
  Down: { axis: Axis.Y, desc: true },
  Left: { axis: Axis.X, desc: false },
  Right: { axis: Axis.X, desc: true },
}
