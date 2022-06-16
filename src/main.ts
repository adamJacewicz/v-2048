import "./styles/tailwind.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { PersistedState } from "./plugins/persisted-state"

const pinia = createPinia().use(PersistedState)
createApp(App).use(pinia).mount("#app")
