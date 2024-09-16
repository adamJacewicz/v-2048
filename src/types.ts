import { UseSwipeDirection } from "@vueuse/core"
import { Axis, Order } from "./constants"


export type Position = {
	x: number
	y: number
}


export type ArrowKeyType = `Arrow${Capitalize<Lowercase<Direction>>}`

export type MoveKeyType = ArrowKeyType |  UseSwipeDirection


export interface Tile extends Position {
	value: number
	merged: boolean
	id: string
}

export type MovementOptions = {
	axis: Axis
	order: Order
}


export type GameState = {
	tiles: Tile[]
	score: number
	best: number
}

export type Direction = Uppercase<Exclude<UseSwipeDirection, 'none'>>