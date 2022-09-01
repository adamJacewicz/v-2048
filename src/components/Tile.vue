<template>
  <div
    :style="position"
    class="absolute h-1/4 w-1/4 p-1.5 text-4xl font-bold text-gray-600 duration-200 sm:text-5xl"
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
import { Tile } from "../game.types"
import { computed, ref, watch } from "vue"
const popKeyframes = [
  { transform: "scale(1)" },
  { transform: "scale(1.2)" },
  { transform: "scale(1)" },
]

const props = defineProps<{ tile: Tile }>()
const tileInner = ref<HTMLDivElement>()

watch(
  () => props.tile.value,
  () =>
    tileInner.value?.animate(popKeyframes, {
      duration: 200,
    })
)
const position = computed(() => {
  const { merged, x, y } = props.tile
  return {
    zIndex: merged ? 0 : 1,
    transform: `translate(calc(100% * ${x}), calc(100% * ${y}))`,
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

.inner {
  animation: Scale 200ms backwards;
  animation-delay: 50ms;
}
</style>
