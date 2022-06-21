<template>
  <div class="flex h-full max-h-full flex-col bg-brown-200">
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
import { useGameStore } from "./stores/game"
import { SwipeDirection, useSwipe } from "@vueuse/core"
import { directionParameters, DirectionType } from "./constants"
const gameStore = useGameStore()

const onSwipeEnd = (e: TouchEvent, direction: SwipeDirection): void =>
  moveHandler(direction)

const onKeyDown = ({ key }: KeyboardEvent): void =>
  moveHandler(key.replace(/arrow/i, ""))

const moveHandler = (direction: string): void => {
  const parsedDirection = direction.toUpperCase() as Uppercase<DirectionType>
  if (parsedDirection in directionParameters) {
    const { axis, desc } = directionParameters[parsedDirection]
    gameStore.move(axis, desc)
  }
}
const { stop: removeSwipeListener } = useSwipe(document, {
  onSwipeEnd,
})

onBeforeMount(() => {
  document.addEventListener("keydown", onKeyDown)
})

onBeforeUnmount(() => {
  removeSwipeListener()
  document.removeEventListener("keydown", onKeyDown)
})
</script>
