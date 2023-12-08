<template>
  <div
    class="relative aspect-square overflow-hidden rounded-md bg-primary-500"
  >
    <GameOver v-if="isGameOver" />
    <div class="grid grid-cols-4 grid-rows-4 w-full h-full p-1">
      <div class="m-1 bg-tile-blank rounded-md"
           :key="i"
           v-for="i in blankTiles" />
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 m-1">
      <Tile :tile="tile"
            :key="tile.id"
            v-for="tile in tiles" />
    </div>
  </div>
</template>
<script setup
        lang="ts">
import Tile from "../components/Tile.vue"
import GameOver from "../components/GameOver.vue"
import { inject } from "vue"
import { BOARD_SIZE } from "../constants"
import { GameStore } from "../game.types"
const { tiles, isGameOver } = inject<GameStore>("game") as GameStore
const blankTiles = BOARD_SIZE * BOARD_SIZE
</script>
