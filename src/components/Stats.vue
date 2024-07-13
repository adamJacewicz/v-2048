<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-1 xs:gap-2">
      <div
        v-for="item in stats"
        :key="item.label"
        :id="item.label"
        class="min-w-[min(50%,65px)] flex-1 rounded-sm bg-primary-500 p-2 text-center font-bold"
      >
        <h5 class="text-sm text-primary-800">{{ item.label.toUpperCase() }}</h5>
        <p class="text-lg leading-6 text-primary-50">
          {{ item.value }}
        </p>
      </div>
    </div>
    <AppButton id="new-game" class="self-end font-medium" @click="initGame">
      New game
    </AppButton>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue"
import { useTransition } from "@vueuse/core"
import { useStore } from "../store"
import AppButton from "./AppButton.vue"

const { score, best, initGame } = useStore()
const scores = reactive([score, best])

const scoresTransition = useTransition(scores, {
  duration: 100,
})

const stats = computed(() =>
  ["score", "best"].map((label, i) => ({
    label,
    value: scoresTransition.value[i].toFixed(0),
  }))
)
</script>
