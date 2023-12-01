import Stats from "../components/Stats.vue"
import { ComponentMountingOptions, DOMWrapper, mount, MountingOptions } from "@vue/test-utils"
import { describe, expect } from "vitest"
import { useStore } from "../store"

vi.mock("../utils.ts", async () => await vi.importActual("../utils.ts"))
vi.mock("../constants.ts", async () => await vi.importActual("../constants.ts"))

const mountStatsElement = (options: ComponentMountingOptions<{}> = {}) => {
  const wrapper = mount(Stats, options)
  const [scoreEl, bestEl] = wrapper.findAll("h5 + p")
  const elementTextIsEqual =
    (element: DOMWrapper<Element>) => (value: string) =>
      expect(element.text()).toBe(value)

  return {
    assert: {
      scoreToBe: elementTextIsEqual(scoreEl),
      bestScoreToBe: elementTextIsEqual(bestEl),
    },
    act: {
      newGame: async () => await wrapper.find("button").trigger("click"),
    },
  }
}

describe("Stats", () => {
  const { updateScore, reset } = useStore()

  afterEach(() => {
    reset()
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  it("component displays proper values", async () => {
    const { assert } = mountStatsElement()
    assert.scoreToBe("0")
    assert.bestScoreToBe("0")
    updateScore(8)
    await vi.advanceTimersByTimeAsync(100)
    assert.scoreToBe("8")
    assert.bestScoreToBe("8")
  })

  it("new game button resets current score", async () => {
    updateScore(8)
    const { assert, act } = mountStatsElement()
    assert.scoreToBe("8")
    assert.bestScoreToBe("8")
    await act.newGame()
    await vi.advanceTimersByTimeAsync(100)
    assert.scoreToBe("0")
    assert.bestScoreToBe("8")
  })
})
