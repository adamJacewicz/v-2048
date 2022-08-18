import { PiniaPlugin } from "pinia"
import { useTile } from "../composables/use-tile"
import { GameState } from "../stores/game.types"

export const PersistedState: PiniaPlugin = ({ options, store }) => {
  if (options.persist) {
    const persistedState = localStorage.getItem(store.$id)
    const state = store.$state
    if (persistedState) {
      try {
        const newState: GameState = JSON.parse(persistedState)
        newState.tiles = newState.tiles.map((tile) => useTile(tile))
        store.$state = newState
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
