import { PiniaPlugin } from "pinia"

export const PersistedState: PiniaPlugin = ({ options, store }) => {
	if (options.persist) {
		const persistedState = localStorage.getItem(store.$id)
		if (persistedState) {
			store.$state = JSON.parse(persistedState)
		}
			store.$subscribe(
			(_, state) => {
				localStorage.setItem(store.$id, JSON.stringify(state))
			},
			{ flush: "sync" }
		)
	}
}