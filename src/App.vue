<template>
  <div class="flex h-full max-h-full flex-col bg-brown-200">
    <div class="m-auto w-[max(300px,70%)] max-w-[500px]">
      <div class="grid grid-cols-2 grid-rows-2">
        <Header class="row-span-2" />
        <Score class="self-center" />
        <button
          @click="reset"
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
import { onBeforeMount, onBeforeUnmount } from "vue"
import { Axis, useGameStore } from "./stores/game"

const gameStore = useGameStore()
const { move, addTile, reset } = gameStore
const onKeyPress = ({ key }: KeyboardEvent) => {
  const handlers: Record<string, () => void> = {
    ArrowUp: () => move(Axis.Y, false),
    ArrowDown: () => move(Axis.Y, true),
    ArrowLeft: () => move(Axis.X, false),
    ArrowRight: () => move(Axis.X, true),
  }
  key in handlers && handlers[key]()
}
gameStore.$subscribe(({ events }) => {
  ;[events].flat().some((e) => [Axis.X, Axis.Y].includes(e.key)) && addTile()
})

onBeforeMount(() => document.addEventListener("keydown", onKeyPress))
onBeforeUnmount(() => document.removeEventListener("keydown", onKeyPress))
</script>
