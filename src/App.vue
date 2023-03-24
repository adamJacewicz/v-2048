<template>
  <div class="flex h-full items-center justify-center bg-primary-200">
    <div class="w-[max(280px,80%)] max-w-[500px]">
      <Header class="flex-1" />
      <Board class="my-5" />
      <Manual />
    </div>
  </div>
</template>
<script setup lang="ts">
import Board from "components/Board.vue"
import Header from "./components/Header.vue"
import Manual from "./components/Manual.vue"
import { useStore } from "./store"
import { onBeforeMount } from "vue"
import { onKeyStroke, useSwipe } from "@vueuse/core"
import { keyList } from "./constants"
import { keyType } from "./game.types"
const { move, initGame, isGameOver, tiles } = useStore()

useSwipe(document, {
  onSwipeEnd: (event: TouchEvent, direction: keyType): void => move(direction),
  threshold: 10,
})
onKeyStroke(keyList, (event: KeyboardEvent): void => move(event.key))
onBeforeMount(
  () => (isGameOver.value || tiles.value.length === 0) && initGame()
)
</script>
