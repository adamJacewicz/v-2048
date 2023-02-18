<template>
  <div
    class="relative flex aspect-[1/1] flex-wrap overflow-hidden rounded-md bg-primary-500 p-1 xs:p-1.5"
  >
    <GameOver />
    <div class="tile tile-blank" :key="i" v-for="i in blankTiles" />
    <div class="absolute top-0 left-0 right-0 bottom-0 m-1 xs:m-1.5">
      <Tile :tile="tile" :key="tile.id" v-for="tile in tiles" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BOARD_SIZE } from "../utils"
import Tile from "../components/Tile.vue"
import GameOver from "../components/GameOver.vue"
import { store } from "../composables/use-2048"
const { tiles } = store
const blankTiles = BOARD_SIZE * BOARD_SIZE
</script>
