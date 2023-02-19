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
import { onBeforeMount } from "vue"
import { onKeyStroke, useSwipe } from "@vueuse/core"
import store from "./store"
import { keyList } from "./constants"
import { keyType } from "./game.types"
const { isGameOver, tiles, move, initGame } = store

const onSwipeEnd = (event: TouchEvent, direction: keyType): void => {
  move(direction)
}

const onKeyDown = (event: KeyboardEvent): void => {
  move(event.key)
}

useSwipe(document, {
  onSwipeEnd,
  threshold: 10,
})

onKeyStroke(keyList, onKeyDown)
onBeforeMount(() => {
  ;(isGameOver.value || tiles.value.length === 0) && initGame()
})
</script>
