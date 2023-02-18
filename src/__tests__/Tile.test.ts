import { mount, shallowMount } from "@vue/test-utils"
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

  it("display proper value", async () => {
    const wrapper = await mount(Tile, {
      props: {
        tile: { x: 2, y: 3, value: 8, merged: false, id: "MOCKED-ID" },
      },
    })
    const element = wrapper.element
    expect(wrapper.classes().includes("text-gray-100")).toBe(true)
    expect(element.style.zIndex).toBe("3")
    expect(element.style.transform).toBe("translate(200%, 300%)")
  })
})
