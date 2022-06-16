<template>
  <div class="relative aspect-[1/1] rounded-md bg-brown-400 p-1.5">
    <div class="absolute left-0 top-0 right-0 bottom-0 m-1.5 flex flex-wrap">
      <div
        class="m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] rounded-md bg-tile-blank"
        :key="_"
        v-for="_ in blankTiles"
      />

      <Tile :tile="tile" :key="tile.id" v-for="tile in tiles" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from "../stores/game"
import Tile from "./Tile.vue"

import { DEFAULT_ROWS } from "../utils"
import { storeToRefs } from "pinia"

const blankTiles = DEFAULT_ROWS * DEFAULT_ROWS
const { tiles } = storeToRefs(useGameStore())
</script>
