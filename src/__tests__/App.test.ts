import { mount, shallowMount } from "@vue/test-utils"
import { describe } from "vitest"
import App from "../App.vue"
import { store } from "../store"

describe("App", () => {
  const { addTile, reset } = store
  it("mount component", async () => {
    const wrapper = mount(App)
    const event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      code: "ArrowDown",
    })
    reset()
    addTile({
      value: 2,
      merged: false,
      id: "dcdec17d-6c03-4d99-be7a-a1aa303cc449",
      x: 2,
      y: 2,
    })
    addTile({
      value: 2,
      merged: false,
      id: "4de7f02a-0916-4b35-ae5e-ddc209b2f156",
      x: 2,
      y: 1,
    })
    window.dispatchEvent(event)
  })
})
