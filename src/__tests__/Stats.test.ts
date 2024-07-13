import Stats from "../components/Stats.vue"
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect } from "vitest"
import { useStore } from "../store"

vi.mock("../utils.ts", async () => await vi.importActual("../utils.ts"))
vi.mock("../constants.ts", async () => await vi.importActual("../constants.ts"))

describe("Stats", () => {
  const { updateScore, reset } = useStore()

  let wrapper: VueWrapper<{}>
  let scoreEl: DOMWrapper<HTMLDivElement>
  let newGameButton: DOMWrapper<HTMLButtonElement>
  let bestEl: DOMWrapper<HTMLDivElement>

  afterEach(() => {
    reset()
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  beforeEach(() => {
    wrapper = mount(Stats)
    newGameButton = wrapper.find("#new-game")
    scoreEl = wrapper.find("#score")
    bestEl = wrapper.find("#best")
    vi.useFakeTimers()
  })

  it("component displays proper values", async () => {
    expect(scoreEl.text()).toContain("SCORE")
    expect(bestEl.text()).toContain("BEST")
    expect(scoreEl.text()).toContain("0")
    expect(bestEl.text()).toContain("0")
    updateScore(8)
    await vi.advanceTimersByTimeAsync(150)
    expect(scoreEl.text()).toContain("8")
    expect(bestEl.text()).toContain("8")
  })

  it("new game button resets current score", async () => {
    updateScore(8)
    await vi.advanceTimersByTimeAsync(150)
    expect(scoreEl.text()).toContain("8")
    expect(bestEl.text()).toContain("8")
    await newGameButton.trigger("click")
    await vi.advanceTimersByTimeAsync(150)
    expect(scoreEl.text()).toContain("0")
    expect(bestEl.text()).toContain("8")
  })
})
