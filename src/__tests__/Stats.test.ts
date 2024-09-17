import Stats from "../components/Stats.vue"
import { DOMWrapper, shallowMount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect } from "vitest"
import { useGame } from "../use-game"
import AppButton from "../components/AppButton.vue"


describe("Stats", () => {
  const { updateScore, reset } = useGame()

  let wrapper: VueWrapper
  let listEl: DOMWrapper<HTMLUListElement>
  let newGameButton: VueWrapper

  afterEach(() => {
    reset()
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  beforeEach(() => {
    wrapper = shallowMount(Stats)
    newGameButton = wrapper.findComponent(AppButton)
    listEl = wrapper.find("ul")
    vi.useFakeTimers()
  })

  it("component displays proper values", async () => {
    const listItems = listEl.findAll('li')
    expect(listItems.every(item => item.text().includes("0"))).toBe(true)
    updateScore(8)
    await vi.advanceTimersByTimeAsync(150)
    expect(listItems.every(item => item.text().includes("8"))).toBe(true)
  })

  it("new game button resets current score", async () => {
    const listItems = listEl.findAll('li')

    updateScore(8)
    await vi.advanceTimersByTimeAsync(150)
    expect(listItems.every(item => item.text().includes("8"))).toBe(true)

    await newGameButton.trigger("click")
    await vi.advanceTimersByTimeAsync(150)
    const [scoreEl, bestEl] = listItems
    expect(scoreEl.text()).toContain("0")
    expect(bestEl.text()).toContain("8")
  })
})
