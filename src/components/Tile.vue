<template>
  <div
    :style="tilePosition"
    class="tile absolute m-1.5 h-[calc(25%-0.75rem)] w-[calc(25%-0.75rem)] text-4xl font-bold text-gray-600 duration-200 sm:text-5xl"
  >
    <div
      ref="tileInner"
      class="inner flex h-full w-full items-center justify-center rounded-md"
      :class="`bg-tile-${tile.value}`"
    >
      {{ tile.value }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tile } from "../stores/game.types"
import { computed, ref, watch } from "vue"

const props = defineProps<{ tile: Tile }>()

const tileInner = ref()

watch(
  () => props.tile.value,
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
  const { merged, x, y } = props.tile
  return {
    zIndex: merged ? 0 : 1,
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
  animation: Scale 200ms backwards;
  animation-delay: 50ms;
}
</style>
