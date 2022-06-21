import { PiniaPlugin } from "pinia"

export const PersistedState: PiniaPlugin = ({ options, store }) => {
  if (options.persist) {
    const persistedState = localStorage.getItem(store.$id)
    const state = store.$state
    if (persistedState) {
      try {
        const newState = JSON.parse(persistedState)
        store.$state = { ...state, ...newState }
      } catch (err) {
        store.$state = state
	      localStorage.setItem(store.$id, JSON.stringify(state))
        console.error(err)
      }
    }
    store.$subscribe(
      (_, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state))
      },
      { flush: "sync" }
    )
  }
}
