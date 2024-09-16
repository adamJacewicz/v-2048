import AppButton from "../components/AppButton.vue"
import { shallowMount } from "@vue/test-utils"
import { describe } from "vitest"

describe("AppButton", () => {
  it("has proper text", () => {
    const wrapper = shallowMount(AppButton, {
      slots: {
        default: "mocked text",
      },
    })
    expect(wrapper.text()).toBe("mocked text")
  })
})
