import { ArrowKeyType, Direction, MovementOptions } from "./types"

export enum Order {
	ASC = 1,
	DESC = -1,
}

export enum Axis {
	X = "x",
	Y = "y"
}


export const movementOptions: Record<Direction, MovementOptions> = {
	UP: { axis: Axis.Y, order: Order.ASC },
	DOWN: { axis: Axis.Y, order: Order.DESC },
	LEFT: { axis: Axis.X, order: Order.ASC },
	RIGHT: { axis: Axis.X, order: Order.DESC }
}

export const arrowKeyList: ArrowKeyType[] = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

export const popKeyframes = [
	{ transform: "scale(1)" },
	{ transform: "scale(1.2)" },
	{ transform: "scale(1)" }
]

export const BOARD_SIZE = 4

