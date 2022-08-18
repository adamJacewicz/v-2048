import { AxisType, Tile } from "../stores/game.types"
import { readonly, shallowRef } from "vue"
import { v4 as useId } from "uuid"

export const useTile = (
  pos: Record<AxisType, number> & Partial<Tile>
): Readonly<Tile> => {
  const tile = {
    x: shallowRef(pos.x),
    y: shallowRef(pos.y),
    value: shallowRef(pos.value ?? 2),
    merged: shallowRef(pos.merged ?? false),
    id: pos.id ?? useId(),
  }

  const move = (axis: AxisType, value: number) => (tile[axis].value = value)
  const merge = () => (tile.merged.value = true)
  const update = () => (tile.value.value *= 2)

  return readonly({
    ...tile,
    move,
    merge,
    update,
  })
}
