<template>
  <div class="flex h-full items-center justify-center bg-primary-200">
    <div class="xs:max-w-xl max-w-xs flex flex-col gap-4">
      <Header />
      <Board />
      <Manual />
    </div>
  </div>
</template>
<script setup lang="ts">
import Board from "./components/Board.vue"
import Header from "./components/Header.vue"
import Manual from "./components/Manual.vue"
import { useStore } from "./store"
import { onBeforeMount } from "vue"
import { onKeyStroke, useSwipe } from "@vueuse/core"
import { keyType } from "./types"
import { arrowKeyList } from "./constants"
const { move, initGame, isGameOver, tiles, addTile, updateScore } = useStore()

const onMove = (direction: keyType) => {
  const { isUpdated, score } = move(direction)
  updateScore(score)
  isUpdated && addTile()
}

useSwipe(document, {
  onSwipeEnd: (_event: TouchEvent, direction: keyType): void => onMove(direction),
  threshold: 10,
})
onKeyStroke(arrowKeyList, (event: KeyboardEvent): void => onMove(event.key))
onBeforeMount(
  () => (isGameOver.value || tiles.value.length === 0) && initGame()
)
</script>
