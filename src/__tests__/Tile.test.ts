import { shallowMount } from "@vue/test-utils"
import { describe, expect } from "vitest"
import Tile from "../components/Tile.vue"

vi.mock("../constants.ts", async () => ({
	...await vi.importActual("../constants.ts"),
	BOARD_SIZE: 4
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
		const inner = wrapper.find(".inner")
		inner.element.animate = vi.fn()

		expect(wrapper.classes()).toContain("w-1/4")
		expect(wrapper.classes()).toContain("h-1/4")

		expect(wrapper.classes()).toContain("text-accent-800")
		expect(inner.classes()).toContain("bg-tile-4")

		await wrapper.setProps({ x: 2, y: 3, value: 16, merged: false, id: "MOCKED-ID" })

		expect(wrapper.classes()).toContain("text-accent-50")
		expect(inner.classes()).toContain("bg-tile-16")
		expect(wrapper.element.style.zIndex).toBe("4")
		expect(inner.element.animate).toHaveBeenCalled()
	})
})
