import { AxisType, MovementOptions } from "./game.types"

export enum Order {
  ASC = 1,
  DESC = -1,
}

export const Axis: Record<Uppercase<AxisType>, AxisType> = {
  X: "x",
  Y: "y",
} as const

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export const keyList = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"]

export const movementOptions: Record<keyof typeof Direction, MovementOptions> =
  {
    [Direction.UP]: { axis: Axis.Y, order: Order.ASC },
    [Direction.DOWN]: { axis: Axis.Y, order: Order.DESC },
    [Direction.LEFT]: { axis: Axis.X, order: Order.ASC },
    [Direction.RIGHT]: { axis: Axis.X, order: Order.DESC },
  }

export const popKeyframes = [
  { transform: "scale(1)" },
  { transform: "scale(1.2)" },
  { transform: "scale(1)" },
]

export const BOARD_SIZE = 4
