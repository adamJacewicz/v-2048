<template>
  <div
    v-show="!tile.merged"
    :style="tilePosition"
    :class="{ 'new-tile': tile.value === 2 }"
    class="absolute m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] origin-center text-5xl font-bold text-gray-600 transition-transform duration-200"
  >
    <div
      class="inner flex h-full w-full items-center justify-center rounded-md transition-transform duration-200"
      :class="bgClass[tile.value]"
    >
      {{ tile.value }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tile } from "../stores/game.types"
import { computed } from "vue"
const props = defineProps<{ tile: Tile }>()

const tilePosition = computed(() => {
  const { x, y } = props.tile

  return {
    transform: `translate(calc((100% + 0.75rem) * ${x}), calc((100% + 0.75rem) * ${y}))`,
  }
})

const bgClass: Record<number, string> = {
  2: "bg-tile-2",
  4: "bg-tile-4",
  8: "bg-tile-8",
  16: "bg-tile-16",
  32: "bg-tile-32",
  64: "bg-tile-64",
  128: "bg-tile-128",
  256: "bg-tile-256",
  512: "bg-tile-512",
  1024: "bg-tile-1024",
  2048: "bg-tile-2048",
}
</script>
