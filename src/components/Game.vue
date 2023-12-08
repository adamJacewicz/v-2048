<template>
  <div class="max-w-sm sm:max-w-xl">
    <Header  />
    <Board class="my-5" />
    <Manual />
  </div>
</template>
<script setup
        lang="ts">
import Board from "components/Board.vue"
import Header from "components/Header.vue"
import Manual from "components/Manual.vue"
import { onBeforeMount, provide } from "vue"
import { onKeyStroke, useSwipe } from "@vueuse/core"
import { keyList } from "../constants"
import { keyType } from "../game.types"
import { useGame } from "../use-game"

const game = useGame()
provide("game", game)
useSwipe(document, {
  onSwipeEnd: (event: TouchEvent, direction: keyType): void => game.move(direction),
  threshold: 10
})
onKeyStroke(keyList, (event: KeyboardEvent): void => game.move(event.key))
onBeforeMount(
  () => {
    (game.isGameOver || game.tiles.value.length === 0) && game.initGame()
  }
)
</script>
