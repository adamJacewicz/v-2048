<template>
  <div
    class="relative flex aspect-[1/1] flex-wrap rounded-md bg-brown-400 p-1.5"
  >
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
import { DEFAULT_ROWS } from "../utils"
import { useGameStore } from "../stores/game"
import Tile from "./Tile.vue"
import { storeToRefs } from "pinia"

const { tiles } = storeToRefs(useGameStore())
const blankTiles = DEFAULT_ROWS * DEFAULT_ROWS
</script>
<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  :deep(.inner) {
    transform: scale(1.2);
  }
  &:deep(.new-tile .inner) {
    transition-delay: 50ms;
    transform: scale(1);
  }
}
.scale-enter-from,
.scale-leave-to {
  :deep(.inner),
  &:deep(.new-tile .inner) {
    transition-delay: 100ms;
    transform: scale(0);
  }
}
</style>
