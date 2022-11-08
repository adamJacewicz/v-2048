<template>
  <div
    class="relative flex aspect-[1/1] flex-wrap overflow-hidden rounded-md bg-primary-500 p-1.5"
  >
    <div
      v-if="isGameOver"
      class="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-black bg-opacity-60 text-gray-200"
    >
      Game over!
    </div>

    <div class="h-1/4 w-1/4 p-1.5" :key="i" v-for="i in blankTiles">
      <div class="h-full w-full rounded-md bg-tile-blank" />
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 m-1.5">
      <Tile :tile="tile" :key="tile.id" v-for="tile in tiles" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BOARD_SIZE } from "../utils"
import Tile from "../components/Tile.vue"
import use2048 from "../composables/use-2048"
import { toRefs } from "vue"
const { tiles, isGameOver } = toRefs(use2048())
const blankTiles = BOARD_SIZE * BOARD_SIZE
</script>
