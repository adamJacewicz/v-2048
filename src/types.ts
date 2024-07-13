import { SwipeDirection } from "@vueuse/core"
import { Axis, Direction, Order } from "./constants"

export type Tile = {
	value: number
	merged: boolean
	id: string
} & Position

export type GameState = {
	tiles: Array<Tile>
	score: number
	best: number
}

export type MovementOptions = {
	axis: AxisType
	order: Order
}

export type Position = {
	x: number
	y: number
}

export type AxisType = Lowercase<keyof typeof Axis>
export type ArrowKeyType = "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft"
export type DirectionType = keyof typeof Direction

export type keyType = (ArrowKeyType | DirectionType | "NONE") &
	keyof typeof SwipeDirection | string


// export type PropEventSource<Type> = {
// 	on<Key extends string & keyof Type>(
// 		eventName: `${Key}Changed`,
// 		callback: (newValue: Type[Key]) => void
// 	): void
// }
//
// export type z<Type, Key extends string & keyof Type> = (
// 	eventName: `${Key}Changed`,
// 	callback: (newValue: Type[Key]) => void
// ) => void

