<template>
  <div
    class="relative flex aspect-[1/1] flex-wrap overflow-hidden rounded-sm bg-primary-500 xs:p-1.5 p-1"
  >
    <GameOver v-if="isGameOver" />
    <div
      class="h-full w-full grid"
      :class="`grid-rows-${BOARD_SIZE} grid-cols-${BOARD_SIZE}`"
    >
      <div
        class="m-1 xs:m-1.5 rounded-sm bg-tile-0"
        :key="i"
        v-for="i in blankTiles"
      />
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 xs:m-1.5 m-1">
      <Tile v-bind="tile" :key="tile.id" v-for="tile in tiles" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Tile from "../components/Tile.vue"
import GameOver from "../components/GameOver.vue"
import { useStore } from "../store"
import { BOARD_SIZE } from "../constants"

const { tiles, isGameOver } = useStore()
const blankTiles = BOARD_SIZE ** 2
</script>
