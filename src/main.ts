import { createPinia } from "pinia"
import "./styles/styles.scss"
import { createApp } from "vue"
import App from "./App.vue"

import { PersistedState } from "./plugins/persisted-state"
const pinia = createPinia().use(PersistedState)
createApp(App).use(pinia).mount("#app")
