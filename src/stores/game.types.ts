export type Tile = {
	x: number
	y: number
	value: number
	merged: boolean
	id: string
}

export type GameState = {
	tiles: Array<Tile>
	score: number
	best: number
}

export type AxisType = "x" | "y"
