import { use2048 } from "../composables/use-2048"

const game = use2048({persist: true})

export const useGame = () => {
  return game
}
