<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <div
        v-for="item in stats"
        :key="item.label"
        class="flex-1 rounded-md bg-primary-500 p-2 min-w-[65px] text-center font-bold uppercase"
      >
        <h5 class="text-sm text-primary-800">{{ item.label }}</h5>
        <p class="text-lg leading-6 text-primary-50">
          {{ item.value }}
        </p>
      </div>
    </div>
    <Button class="self-end font-medium mt-2" @click="initGame">New game</Button>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue"
import { useTransition } from "@vueuse/core"
import Button from "./Button.vue"
import use2048 from "../composables/use-2048"
const { score, best, initGame } = toRefs(use2048())

const scoreTransition = useTransition(score, {
  duration: 100,
})
const bestTransition = useTransition(best, {
  duration: 100,
})
const stats = computed(() => [
  {
    label: "score",
    value: scoreTransition.value.toFixed(0),
  },
  {
    label: "best",
    value: bestTransition.value.toFixed(0),
  },
])
</script>