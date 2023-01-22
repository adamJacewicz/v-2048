<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <div
        v-for="item in stats"
        :key="item.label"
        class="flex-1 rounded-md bg-primary-500 py-2 px-4 text-center font-bold uppercase text-primary-800"
      >
        <div class="text-sm">{{ item.label }}</div>
        <div class="text-lg leading-5 text-primary-100">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div class="mt-2 flex items-center justify-between">
      <Button @click="initGame">New game</Button>
    </div>
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
