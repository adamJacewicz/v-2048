import Button from "../components/AppButton.vue"
import { shallowMount } from "@vue/test-utils"
import { describe } from "vitest"

describe("Button", () => {
  it("has proper text", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "mocked text",
      },
    })
    expect(wrapper.text()).toBe("mocked text")
  })
})
