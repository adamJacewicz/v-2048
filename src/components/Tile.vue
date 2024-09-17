<template>
  <div
    :style="tileStyles"
    :class="tileClasses"
    class="xs:p-1.5 p-1 text-4xl xs:text-5xl font-bold duration-200 absolute"
  >
    <div
      ref="tileInnerRef"
      :class="backgroundClass"
      class="inner flex-col flex h-full items-center justify-center rounded-md"
    >
      {{ value }}
    </div>
  </div>
</template>
<script setup
        lang="ts">
import { Tile } from "../types"
import { computed, useTemplateRef, watch } from "vue"
import { Axis, BOARD_SIZE, popKeyframes } from "../constants"
import { generateTranslationClass } from "../utils"

const tileInnerRef = useTemplateRef<HTMLDivElement>("tileInnerRef")

const props = defineProps<Tile>()

const tileClasses = computed(() => {
    return [
      props.value < 8 ? "text-accent-800" : "text-accent-50",
      Object.values(Axis).map(axis => generateTranslationClass(axis, props[axis])),
      `w-1/${BOARD_SIZE} h-1/${BOARD_SIZE}`
    ]
  }
)

const backgroundClass = computed(() => {
  const exp = Math.log2(props.value) % 11
  const value = Math.pow(2, exp)
  return `bg-tile-${value}`
})


const tileStyles = computed(() => ({
    zIndex: props.merged ? 0 : Math.log2(props.value)
  }
))

watch(() => props.value, () => {
  tileInnerRef.value?.animate(popKeyframes, {
    duration: 200
  })

}, { flush: "post" })
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
