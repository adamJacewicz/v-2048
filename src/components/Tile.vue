<template>
  <div
    v-show="!tile.merged"
    :style="tilePosition"
    class="tile absolute m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] text-4xl font-bold text-gray-600 duration-[200ms] sm:text-5xl"
  >
    <div
      ref="tileInner"
      class="inner flex h-full w-full items-center justify-center rounded-md duration-[000ms]"
      :class="`bg-tile-${tile.value}`"
    >
      {{ tile.value }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tile } from "../stores/game.types"
import { computed, ref, watch } from "vue"

const { tile } = defineProps<{ tile: Tile }>()

const tileInner = ref()

watch(
  () => tile.value,
  () => {
    tileInner.value.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
        { transform: "scale(1)" },
      ],
      {
        ease: true,
        duration: 200,
      }
    )
  }
)

const tilePosition = computed(() => {
  const { x, y } = tile
  return {
    zIndex: tile.merged ? 0 : 1,
    transform: `translate(calc((100% + 0.75rem) * ${x}), calc((100% + 0.75rem) * ${y}))`,
  }
})
</script>
<style scoped lang="scss">
@keyframes Scale {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.tile .inner {
  animation: Scale 200ms both;
  animation-delay: 100ms;
}
</style>
