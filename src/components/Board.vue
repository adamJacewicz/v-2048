<template>
  <div
    class="relative flex aspect-[1/1] flex-wrap overflow-hidden rounded-md bg-brown-400 p-1.5"
  >
    <div
      v-if="!movementPossible"
      class="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-black bg-opacity-60"
    >
      <h1 class="text-4xl text-gray-200">Game over!</h1>
    </div>

    <div
      class="m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] rounded-md bg-tile-blank"
      :key="_"
      v-for="_ in blankTiles"
    />
    <transition-group
      tag="div"
      name="scale"
      class="absolute left-0 top-0 right-0 bottom-0 m-1.5 flex flex-wrap"
    >
      <Tile :tile="tile" :key="tile.id" v-for="tile in tiles" />
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { BOARD_SIZE } from "../utils"
import { useGameStore } from "../stores/game"
import Tile from "./Tile.vue"
import { storeToRefs } from "pinia"
import { computed } from "vue"

const { tiles, availablePositions, mergePossible } = storeToRefs(useGameStore())

const movementPossible = computed(
  () => !!availablePositions.value.length || mergePossible.value
)

const blankTiles = BOARD_SIZE * BOARD_SIZE
</script>
<style lang="scss" scoped>
.scale-enter-from {
  &:deep(.inner) {
    transform: scale(0);
  }
}
.scale-enter-to {
  &.new-tile:deep(.inner) {
    transition-delay: 50ms;
    transform: scale(1);
  }
  &:not(.new-tile):deep(.inner) {
    transform: scale(1.2);
  }
}
</style>
