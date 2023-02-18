import Button from "../components/Button.vue"
import { shallowMount } from "@vue/test-utils"
import { describe } from "vitest"

describe("Button", () => {
  it("mount component", () => {
    const wrapper = shallowMount(Button, {})
    expect(wrapper).toBeDefined()
  })

  it("has proper text", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "mocked text",
      },
    })
    expect(wrapper.text()).toContain("mocked text")
  })
})
