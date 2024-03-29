<template>
  <div :style="position"
       class="w-1/4 h-1/4 p-1 absolute xs:text-5xl font-bold duration-200">
    <div
      ref="tileInner"
      :class="[colorClass, 'inner flex h-full items-center rounded-md justify-center text-3xl xs:text-5xl']"
    >
      {{ tileValue }}
    </div>
  </div>
</template>
<script setup
        lang="ts">
import { Tile } from "../game.types"
import { computed, ref, watch } from "vue"
import { popKeyframes } from "../constants"

const tileInner = ref<HTMLDivElement>()
const props = defineProps<{ tile: Tile }>()
const tileValue = computed(() => props.tile.value)

const colorClass = computed(() => {
  const exp = Math.log2(tileValue.value) % 11
  const value = Math.pow(2, exp)
  const textColor = tileValue.value < 8 ? "text-primary-800" : "text-gray-100"
  return [`bg-tile-${value}`, textColor]
})

const position = computed(() => {
  const { merged, x, y } = props.tile
  return {
    zIndex: merged ? 0 : Math.log2(tileValue.value),
    transform: `translate(${x * 100}%, ${y * 100}%)`
  }
})

const runPopAnimation = () => {
  tileInner.value?.animate(popKeyframes, {
    duration: 200
  })
}
watch(tileValue, runPopAnimation, { flush: "post" })
</script>
<style scoped
       lang="scss">
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
