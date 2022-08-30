import { AxisType, Position, Tile } from "../stores/game.types"
import { computed, reactive, readonly } from "vue"
import { generateId } from "./use-id"

export const useTile = (
  initialValues: Partial<Tile> & Position
): Readonly<Tile> => {
  const tile = reactive({
    value: 2,
    merged: false,
    id: generateId(),
    ...initialValues,
  })
  return readonly({
    x: computed(() => tile.x),
    y: computed(() => tile.y),
    value: computed(() => tile.value),
    merged: computed(() => tile.merged),
    id: computed(() => tile.id),
    move: (axis: AxisType, value: number) => (tile[axis] = value),
    merge: () => (tile.merged = true),
    update: () => (tile.value *= 2),
  })
}
