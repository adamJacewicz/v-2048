import { ArrowKeyType, DirectionType, MovementOptions } from "./types"

export enum Order {
	ASC = 1,
	DESC = -1,
}

export enum Axis {
	X = "x",
	Y = "y"
}

export enum Direction {
	UP = "UP",
	DOWN = "DOWN",
	LEFT = "LEFT",
	RIGHT = "RIGHT",
}

export const keys: Record<Lowercase<DirectionType>, ArrowKeyType> = {
	up: "ArrowUp",
	down: "ArrowDown",
	left: "ArrowLeft",
	right: "ArrowRight"
} as const


export const movementOptions: Record<DirectionType, MovementOptions> = {
	[Direction.UP]: { axis: Axis.Y, order: Order.ASC },
	[Direction.DOWN]: { axis: Axis.Y, order: Order.DESC },
	[Direction.LEFT]: { axis: Axis.X, order: Order.ASC },
	[Direction.RIGHT]: { axis: Axis.X, order: Order.DESC }
}

export const arrowKeyList = [keys.right, keys.down, keys.left, keys.up]

export const popKeyframes = [
	{ transform: "scale(1)" },
	{ transform: "scale(1.2)" },
	{ transform: "scale(1)" }
]

export const BOARD_SIZE = 4

