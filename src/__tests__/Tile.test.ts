import { shallowMount } from "@vue/test-utils"
import { describe, expect } from "vitest"
import Tile from "../components/Tile.vue"

vi.mock("../constance.ts", async () => ({
	...await vi.importActual("../constance.ts"),
	BOARD_SIZE: 6
}))

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
		const element = wrapper.element
		const inner = wrapper.find(".inner")
		inner.element.animate = vi.fn()

		const classNames = [
			"text-accent-800",
			"translate-x-2x-full",
			"translate-y-3x-full",
			"w-1/4",
			"h-1/4"
		]

		expect(classNames.some(className => expect(className).toContain("text-accent-800"))).toBe(true)
		await wrapper.setProps({ x: 2, y: 3, value: 16, merged: false, id: "MOCKED-ID" })
		expect(wrapper.classes()).toContain("text-accent-50")
		expect(element.style.zIndex).toBe("4")
		expect(inner.element.animate).toHaveBeenCalled()
	})
})
