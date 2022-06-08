<template>
  <div
    class="relative flex aspect-[1/1] flex-wrap rounded-md bg-brown-400 p-1.5"
  >
    <div
      class="m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] rounded-md bg-tile-blank"
      :key="_"
      v-for="_ in tileCount"
    />
    <transition-group
      name="tile"
      tag="div"
      class="absolute left-0 top-0 right-0 bottom-0 m-1.5 flex h-[calc(100%-0.75rem)]"
    >
      <Tile :tile="tile" :key="tile.id" v-for="tile in gameStore.tiles" />
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from "../stores/game"
import Tile from "./Tile.vue"
import { DEFAULT_ROWS } from "../utils"

const tileCount = DEFAULT_ROWS * DEFAULT_ROWS
const gameStore = useGameStore()
</script>
<style lang="scss" scoped>
.tile-enter-active,
.tile-leave-active {
  :deep(.inner) {
    transform: scale(1.2);
  }
  &.new-tile :deep(.inner) {
    transform: scale(1);
  }
}

.tile-enter-from,
.tile-leave-to {
  :deep(.inner.inner) {
    transform: scale(0);
  }
}
</style>
