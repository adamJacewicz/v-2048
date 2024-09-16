import AppButton from "../components/AppButton.vue"
import { shallowMount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe } from "vitest"

describe("AppButton", () => {
  let wrapper: VueWrapper
  beforeEach(() => {
     wrapper = shallowMount(AppButton, {
      slots: {
        default: "mocked text",
      },
    })
  })

  it("has proper text", () => {
    expect(wrapper.text()).toBe("mocked text")
  })

  it("has proper class", () => {
    expect(wrapper.classes()).toContain("bg-accent-500")
  })
})
