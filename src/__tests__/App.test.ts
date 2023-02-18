import { mount, shallowMount } from "@vue/test-utils"
import { describe, expect } from "vitest"
import Tile from "../components/Tile.vue"
import App from "../App.vue"
import { store, reset, addTile } from "../composables/use-2048"

describe("App", () => {
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
    console.log(store.tiles.value)
    window.dispatchEvent(event)
    console.log(wrapper.getComponent(Tile).html())
  })
})
