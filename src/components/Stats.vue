<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <div
        v-for="item in stats"
        :key="item.label"
        class="min-w-[65px] flex-1 rounded-md bg-primary-500 p-2 text-center font-bold uppercase"
      >
        <h5 class="text-sm text-primary-800">{{ item.label }}</h5>
        <p class="text-lg leading-6 text-primary-50">
          {{ item.value }}
        </p>
      </div>
    </div>
    <Button class="mt-2 self-end font-medium" @click="initGame"
      >New game</Button
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useTransition } from "@vueuse/core"
import Button from "./Button.vue"
import { useStore } from "../store"

const { score, best, initGame } = useStore()

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
