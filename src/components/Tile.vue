<template>
  <div :style="position" :class="tileClasses">
    <div
      ref="tileInner"
      class="inner flex h-full items-center justify-center rounded-md"
      :class="backgroundClass"
    >
      {{ tile.value }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tile } from "../game.types"
import { computed, ref, watch } from "vue"
import { popKeyframes } from "../constants"

const { tile } = defineProps<{ tile: Tile }>()
const tileInner = ref<HTMLDivElement>()

const tileValue = computed(() => tile.value)

const tileClasses = computed(() => [
  tileValue.value < 8 ? " text-primary-800" : " text-gray-100",
  "tile",
  "absolute",
  "text-4xl",
  "sm:text-5xl",
  "font-bold",
  "duration-200",
])

const backgroundClass = computed(() => {
  const exp = Math.log2(tileValue.value) % 11
  return `bg-tile-${Math.pow(2, exp)}`
})

const position = computed(() => {
  const { merged, x, y } = tile
  return {
    zIndex: merged ? 0 : Math.log2(tileValue.value),
    transform: `translate(${x * 100}%, ${y * 100}%)`,
  }
})

const runPopAnimation = () =>
  tileInner.value?.animate(popKeyframes, {
    duration: 200,
  })

watch(tileValue, runPopAnimation, { flush: "post" })
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
  animation: Scale 200ms both;
  animation-delay: 50ms;
}
</style>
