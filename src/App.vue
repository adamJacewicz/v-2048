<template>
  <div class="flex h-full flex-col bg-primary-200">
    <div class="m-auto w-[max(280px,80%)] max-w-[500px]">
      <div class="flex gap-4">
        <Header class="flex-1" />
        <Stats class="flex-1" />
      </div>
      <Board class="my-5" />
      <section class="text-lg text-gray-600">
        <span class="font-bold">HOW TO PLAY:</span> Use your
        <span class="font-bold">arrow keys</span> or
        <span class="font-bold">swipe</span> to move the tiles. When two tiles
        with the same number touch, they
        <span class="font-bold">merge into one!</span>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import Board from "./components/Board.vue"
import Stats from "./components/Stats.vue"
import Header from "./components/Header.vue"
import { onBeforeMount, onBeforeUnmount, toRef, toRefs } from "vue"
import { SwipeDirection, useEventListener, useSwipe } from "@vueuse/core"
import { getMovementOptions } from "./utils"
import { useGame } from "./stores/game"

// function handleMove(event: TouchEvent, direction: SwipeDirection): void
// function handleMove(event: KeyboardEvent, direction?: undefined): void
// function handleMove(event: TouchEvent | KeyboardEvent, direction?: SwipeDirection) {
//   move(getMovementOptions(direction ?? event.key))
// }
const game = useGame()
const { initGame, gameOver, move, reset } = game
const { tiles } = toRefs(game)

const handleMove = <
  D extends keyof typeof SwipeDirection | undefined,
  E extends D extends SwipeDirection ? TouchEvent : KeyboardEvent
>(
  event: E,
  direction?: D
): void => move(getMovementOptions(direction ?? event.key))

const { stop: removeSwipeListener } = useSwipe(document, {
  onSwipeEnd: handleMove,
  threshold: 10,
})
useEventListener("keydown", handleMove)
onBeforeMount(() => {
  gameOver && reset()
  tiles.value.length === 0 && initGame()
})
onBeforeUnmount(removeSwipeListener)
</script>
