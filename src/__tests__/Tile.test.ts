import { shallowMount } from "@vue/test-utils"
import { describe, expect } from "vitest"
import Tile from "../components/Tile.vue"

describe("Tile", () => {
	it("display proper value", () => {
		const wrapper = shallowMount(Tile, {
			props: { x: 2, y: 3, value: 8, merged: false, id: "MOCKED-ID" }
		})
		expect(wrapper.text()).toContain("8")
		expect(wrapper.isVisible()).toBe(true)
	})

	it("has proper styles and classes", async () => {
		const wrapper = shallowMount(Tile, {
			props: { x: 2, y: 3, value: 4, merged: false, id: "MOCKED-ID" }
		})
		const element = wrapper.element as HTMLDivElement
		const inner = wrapper.find(".inner")
		inner.element.animate = vi.fn()

		expect(wrapper.classes().includes("text-primary-800")).toBe(true)
		expect(wrapper.classes().includes("translate-x-2x-full")).toBe(true)
		expect(wrapper.classes().includes("translate-y-3x-full")).toBe(true)
		expect(element.style.zIndex).toBe("2")

		await wrapper.setProps({ x: 2, y: 3, value: 16, merged: false, id: "MOCKED-ID" })
		expect(wrapper.classes().includes("text-gray-100")).toBe(true)
		expect(element.style.zIndex).toBe("4")
		expect(inner.element.animate).toHaveBeenCalled()
	})
})
