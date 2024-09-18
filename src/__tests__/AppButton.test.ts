import AppButton from "../components/AppButton.vue"
import { beforeEach, describe } from "vitest"
import { screen, render } from "@testing-library/vue"
import "@testing-library/jest-dom"

describe("AppButton", () => {
	beforeEach(() => {
		render(AppButton, {
			slots: {
				default: "mocked"
			}
		})
	})

	it("has proper text", () => {
		expect(screen.getByRole("button")).toHaveTextContent("mocked")
	})

	it("has proper class", () => {
		expect(screen.getByRole("button")).toHaveClass("bg-accent-500")
	})
})
