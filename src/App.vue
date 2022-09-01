<template>
  <div class="flex h-full bg-primary-200">
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
import { onBeforeMount, toRefs } from "vue"
import { onKeyStroke, SwipeDirection, useSwipe } from "@vueuse/core"
import { getMovementOptions } from "./utils"
import { use2048 } from "./composables/use-2048"
import { keyList } from "./constants"

const game = use2048()
const { move, reset, initGame } = game
const { gameOver, tiles } = toRefs(game)
const onSwipeEnd = (event: TouchEvent, direction: SwipeDirection): void =>
  move(getMovementOptions(direction))

const onKeyDown = (event: KeyboardEvent): void =>
  move(getMovementOptions(event.key))

useSwipe(document, {
  onSwipeEnd,
  threshold: 10,
})

onKeyStroke(keyList, onKeyDown)
onBeforeMount(() => {
  gameOver.value && reset()
  tiles.value.length === 0 && initGame()
})
</script>
