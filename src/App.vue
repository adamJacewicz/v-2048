<template>
  <div class="flex h-[100vh] max-h-full flex-col bg-brown-200">
    <div class="m-auto w-[max(280px,70%)] max-w-[500px]">
      <div class="flex">
        <Header class="flex-1" />
        <Stats class="flex-1" />
      </div>
      <Board class="my-5" />
      <section class="text-lg text-gray-600">
        <span class="font-bold">HOW TO PLAY:</span> Use your
        <span class="font-bold">arrow keys</span> to move the tiles. When two
        tiles with the same number touch, they
        <span class="font-bold">merge into one!</span>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import Board from "./components/Board.vue"
import Stats from "./components/Stats.vue"
import Header from "./components/Header.vue"
import { onBeforeMount, onBeforeUnmount } from "vue"
import { useGame } from "./stores/game"
import { SwipeDirection, useEventListener, useSwipe } from "@vueuse/core"
import { getMovementOptions } from "./utils"

const game = useGame()
const { move, reset } = game

const onSwipeEnd = (e: TouchEvent, direction: SwipeDirection): void =>
  getMovementOptions(direction) && move(getMovementOptions(direction))

const onKeyDown = ({ key }: KeyboardEvent): void =>
  getMovementOptions(key) && move(getMovementOptions(key))

const { stop: removeSwipeListener } = useSwipe(document, {
  onSwipeEnd,
})
useEventListener("keydown", onKeyDown)
onBeforeMount(() => {
  game.tiles.length === 0 && game.score === 0 && reset()
})
onBeforeUnmount(removeSwipeListener)
</script>
<style lang="scss">
body {
  overscroll-behavior: contain;
}

html {
  font-size: clamp(14px, 3vw, 16px);
}
</style>
