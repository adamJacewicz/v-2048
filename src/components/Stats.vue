<template>
  <section class="flex-1">
    <ul class="flex gap-2 justify-end">
      <li v-for="item in stats" :key="item.label"
        class="min-w-[min(50%,130px)]  rounded-md bg-accent-500 p-2 text-center font-bold ">
        <h5 class="text-sm text-accent-900 uppercase">{{ item.label }}</h5>
        <p class="text-lg leading-6 text-accent-50">
          {{ item.value }}
        </p>
      </li>
    </ul>
    <AppButton class="mt-2 block ml-auto" @click="initGame">
      New game
    </AppButton>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useTransition } from "@vueuse/core"
import AppButton from "./AppButton.vue"
import { useGame } from "../use-game"

const { score, best, initGame } = useGame()

const scoresTransition = useTransition([score, best], {
  duration: 100
})

const stats = computed(() =>
  ["score", "best"].map((label, i) => ({
    label,
    value: scoresTransition.value[i].toFixed(0)
  }))
)
</script>
