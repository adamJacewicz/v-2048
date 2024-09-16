import Stats from "../components/Stats.vue"
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect } from "vitest"
import { useGame } from "../use-game"
import AppButton from "../components/AppButton.vue"

vi.mock("../utils.ts", async () => await vi.importActual("../utils.ts"))
vi.mock("../constants.ts", async () => await vi.importActual("../constants.ts"))

describe("Stats", () => {
  const { updateScore, reset } = useGame()

  let wrapper: VueWrapper
  let listEl: DOMWrapper<HTMLUListElement>
  let newGameButton: VueWrapper
  let bestEl: DOMWrapper<HTMLDivElement>

  afterEach(() => {
    reset()
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  beforeEach(() => {
    wrapper = mount(Stats)
    newGameButton = wrapper.findComponent(AppButton)
    listEl = wrapper.find("ul")
    vi.useFakeTimers()
  })

  it("component displays proper values", async () => {
    const listItems = listEl.findAll('li')
    listItems.forEach(item => {
      expect(item.text()).toContain("0")
    })
    updateScore(8)
    await vi.advanceTimersByTimeAsync(150)
    listItems.forEach(item => {
      expect(item.text()).toContain("8")
    })
  })

  it("new game button resets current score", async () => {
    const listItems = listEl.findAll('li')

    updateScore(8)
    await vi.advanceTimersByTimeAsync(150)
    listItems.forEach(item => {
      expect(item.text()).toContain("8")
    })

    await newGameButton.trigger("click")
    await vi.advanceTimersByTimeAsync(150)
    const [scoreEl, bestEl] = listItems
    expect(scoreEl.text()).toContain("0")
    expect(bestEl.text()).toContain("8")
  })
})
