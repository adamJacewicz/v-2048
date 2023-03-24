import { shallowMount } from "@vue/test-utils"
import { describe, expect } from "vitest"
import Tile from "../components/Tile.vue"

describe("Tile", () => {
  it("display proper value", () => {
    const wrapper = shallowMount(Tile, {
      props: {
        tile: { x: 2, y: 3, value: 8, merged: false, id: "MOCKED-ID" },
      },
    })
    expect(wrapper.text()).toContain("8")
    expect(wrapper.isVisible()).toBe(true)
  })

  it("has proper styles", async () => {
    const wrapper = shallowMount(Tile, {
      props: {
        tile: { x: 2, y: 3, value: 4, merged: false, id: "MOCKED-ID" },
      },
    })
    const element = wrapper.element as HTMLElement
    const inner = wrapper.find(".inner")
    inner.element.animate = vi.fn()

    expect(wrapper.classes().includes("text-primary-800")).toBe(true)
    expect(element.style.zIndex).toBe("2")
    expect(element.style.transform).toBe("translate(200%, 300%)")

    await wrapper.setProps({
      tile: { x: 2, y: 3, value: 16, merged: false, id: "MOCKED-ID" },
    })
    expect(wrapper.classes().includes("text-gray-100")).toBe(true)
    expect(element.style.zIndex).toBe("4")
    expect(inner.element.animate).toHaveBeenCalled()
  })
})
