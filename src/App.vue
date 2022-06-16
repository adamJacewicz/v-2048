<template>
  <div class="flex h-full max-h-full flex-col bg-brown-200">
    <div class="m-auto w-[max(280px,70%)] max-w-[500px]">
      <div class="grid grid-cols-2 grid-rows-2">
        <Header class="row-span-2" />
        <Score class="self-center" />
        <button
          @click="gameStore.init"
          class="mt-auto ml-auto rounded-md border bg-brown-600 py-2 px-4 text-lg font-medium text-gray-100"
        >
          New game
        </button>
      </div>
      <Board class="mt-8" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Board from "./components/Board.vue"
import Score from "./components/Score.vue"
import Header from "./components/Header.vue"
import { onBeforeMount, onBeforeUnmount, watch } from "vue"
import { Axis, useGameStore } from "./stores/game"
import { SwipeDirection, useSwipe } from "@vueuse/core"
const gameStore = useGameStore()

watch(
  () => gameStore.tiles,
  (curr, prev) => {
    JSON.stringify(curr) !== JSON.stringify(prev) && gameStore.addTile()
  },
  {
    flush: "post",
  }
)

const moveParams: Record<string, { axis: Axis; desc: boolean }> = {
  UP: { axis: Axis.Y, desc: false },
  DOWN: { axis: Axis.Y, desc: true },
  LEFT: { axis: Axis.X, desc: false },
  RIGHT: { axis: Axis.X, desc: true },
}

const onSwipeEnd = (e: TouchEvent, direction: SwipeDirection) =>
  moveHandler(direction)

const omKeyDown = (e: KeyboardEvent) =>
  moveHandler(e.key.toUpperCase().replace("ARROW", ""))

const moveHandler = (direction: string): void => {
  if (moveParams.hasOwnProperty(direction)) {
    const { axis, desc } = moveParams[direction]
    gameStore.move(axis, desc)
  }
}
const { stop: removeSwipeListener } = useSwipe(document, {
  onSwipeEnd,
})

onBeforeMount(() => document.addEventListener("keydown", omKeyDown))
onBeforeUnmount(() => {
  removeSwipeListener()
  document.removeEventListener("keydown", omKeyDown)
})
</script>
