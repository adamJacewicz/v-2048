import { beforeEach, expect } from "vitest"
import { BOARD_SIZE, Direction } from "../constants"
import { getCoordinates } from "../utils"
import { useStore } from "../store"
import { mount } from "@vue/test-utils"
import Board from "../components/Board.vue"
import GameOver from "../components/GameOver.vue"
import { nextTick } from "vue"

const {
  tiles,
  score,
  best,
  availablePositions,
  isGameOver,
  isMergePossible,
  addTile,
  removeMergedTiles,
  updateScore,
  reset,
  move,
} = useStore()

describe("Game store", () => {
  beforeEach(() => {
    reset()
  })

  it("updates score and best", () => {
    expect(score.value).toBe(0)
    expect(best.value).toBe(0)
    updateScore(4)
    expect(score.value).toBe(4)
    expect(best.value).toBe(4)
  })

  it("adds tile", () => {
    const newTiles = [
      { x: 3, y: 3, value: 8, merged: false, id: "MOCKED-ID-0" },
      { x: 2, y: 3, value: 16, merged: true, id: "MOCKED-ID-1" },
    ]
    newTiles.forEach(addTile)
    expect(tiles.value).toMatchObject(newTiles)
  })

  it("prevent from adding tile when there is no free cells", () => {
    const coordinates = Array.from({ length: 21 }, (_, i) => getCoordinates(i))
    coordinates.forEach(addTile)
    expect(tiles.value).toHaveLength(BOARD_SIZE ** 2)
    expect(availablePositions.value).toHaveLength(0)
  })

  it("moves into right direction", () => {
    const initial = [
      { x: 2, y: 2, value: 2, merged: false, id: "MOCKED-ID-0" },
      { x: 2, y: 3, value: 2, merged: false, id: "MOCKED-ID-1" },
      { x: 1, y: 0, value: 4, merged: false, id: "MOCKED-ID-2" },
      { x: 1, y: 3, value: 4, merged: false, id: "MOCKED-ID-3" },
    ]
    const result = [
      { x: 2, y: 3, value: 2, merged: true, id: "MOCKED-ID-0" },
      { x: 2, y: 3, value: 4, merged: false, id: "MOCKED-ID-1" },
      { x: 1, y: 3, value: 4, merged: true, id: "MOCKED-ID-2" },
      { x: 1, y: 3, value: 8, merged: false, id: "MOCKED-ID-3" },
    ]

    initial.forEach(addTile)
    move(Direction.DOWN)
    expect(result).toMatchObject(tiles.value)
  })

  it("remove merged tiles", () => {
    const newTiles = [
      { x: 2, y: 2, merged: false },
      { x: 2, y: 3, merged: true },
      { x: 1, y: 1, merged: true },
    ]
    newTiles.forEach(addTile)
    removeMergedTiles()
    expect(tiles.value).toHaveLength(1)
    expect(tiles.value).toMatchObject([{ x: 2, y: 2, merged: false }])
  })

  it("gameover when there is no available cells and no tiles to merge", async () => {
    const wrapper = mount(Board)
    const coordinates = Array.from({ length: BOARD_SIZE ** 2 }, (_, i) => ({
      value: i,
      ...getCoordinates(i),
    }))
    coordinates.forEach(addTile)
    await nextTick()
    const gameOver = wrapper.findComponent(GameOver)
    expect(availablePositions.value).toHaveLength(0)
    expect(isMergePossible.value).toBe(false)
    expect(isGameOver.value).toBe(true)
    expect(gameOver.isVisible()).toBe(true)
  })
})
