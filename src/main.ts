import "./styles/tailwind.css"
import { createApp } from "vue"
import { createPinia, PiniaPlugin } from "pinia"
import App from "./App.vue"

const PersistState: PiniaPlugin = ({ options, store }) => {
  if (options.persist) {
    const persistedState = localStorage.getItem(store.$id)
    if (persistedState) {
      store.$state = JSON.parse(persistedState)
    }
    store.$subscribe((_, state) => {
      localStorage.setItem(store.$id, JSON.stringify(state))
    })
  }
}

const pinia = createPinia().use(PersistState)
createApp(App).use(pinia).mount("#app")
