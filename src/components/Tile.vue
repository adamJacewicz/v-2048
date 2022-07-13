<template>
  <div
    v-show="!tile.merged"
    :style="tilePosition"
    :class="{ 'new-tile': tile.value === 2 }"
    class="tile absolute m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] text-4xl font-bold text-gray-600 duration-200 sm:text-5xl"
  >
    <div
      class="inner flex h-full w-full items-center justify-center rounded-md duration-200"
      :class="`bg-tile-${tile.value}`"
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
</script>
