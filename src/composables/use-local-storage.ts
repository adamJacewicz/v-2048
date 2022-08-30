import { customRef, unref } from "vue"
import { useTile } from "./use-tile"

export const useLocalStorage = (id: string) => {
  const setItem = (value: any) => {
    localStorage.setItem(id, value)
  }

  const getItem = () => localStorage.getItem(id)
  return customRef((track, trigger) => {
    return {
      get() {
        const value = JSON.parse(getItem() as string)
        if(value) value.tiles = value.tiles.map(useTile)
        track()
        return value
      },
      set(newValue) {
        setItem(JSON.stringify(unref(newValue)))
        trigger()
      },
    }
  })
}
