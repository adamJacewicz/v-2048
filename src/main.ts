import './styles/tailwind.css'
import { createApp } from 'vue'
import { createPinia, PiniaPlugin } from 'pinia'
import App from './App.vue'

const CustomPlugin: PiniaPlugin = ({ options, store }) => {
  if (options.persist) {
    const persistedState = localStorage.getItem(store.$id)
    if (persistedState) {
      store.$state = JSON.parse(persistedState)
      store.$subscribe(() => {
        localStorage.setItem(store.$id, JSON.stringify(store.$state))
      })
    }
  }
}

const pinia = createPinia()
pinia.use(CustomPlugin)
createApp(App).use(pinia).mount('#app')
