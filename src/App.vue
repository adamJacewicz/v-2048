<template>
  <div class="flex h-[100vh] max-h-full flex-col bg-brown-200">
    <div class="m-auto w-[max(280px,80%)] max-w-[500px]">
      <div class="flex">
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
import { onBeforeMount, onBeforeUnmount } from "vue"
import { useGame } from "./stores/game"
import { SwipeDirection, useEventListener, useSwipe } from "@vueuse/core"
import { getMovementOptions } from "./utils"
import { storeToRefs } from "pinia"

const game = useGame()
const { move, reset, score } = game
const { tiles } = storeToRefs(game)

// function handleMove(event: TouchEvent, direction: SwipeDirection): void
// function handleMove(event: KeyboardEvent, direction?: undefined): void
// function handleMove(event: TouchEvent | KeyboardEvent, direction?: SwipeDirection) {
//   move(getMovementOptions(direction ?? event.key))
// }

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
onBeforeMount(() => tiles.value.length === 0 && score === 0 && reset())
onBeforeUnmount(removeSwipeListener)
</script>