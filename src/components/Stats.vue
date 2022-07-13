<template>
  <div class="flex flex-1 flex-col">
    <div class="flex justify-end text-sm font-medium uppercase text-gray-100">
      <div
        v-for="item in stats"
        :key="item.label"
        class="ml-2 max-w-[100px] flex-1 rounded-md border-0 bg-brown-400 py-2 px-4 text-center"
      >
        <div>{{ item.label }}</div>
        <div class="text-2xl leading-6">
          {{ item.value }}
        </div>
      </div>
    </div>
    <button
      @click="gameStore.init"
      class="mt-auto ml-auto rounded-md border bg-brown-600 py-2 px-4 text-lg font-medium text-gray-100"
    >
      New game
    </button>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from "../stores/game"
import { computed } from "vue"
import { storeToRefs } from "pinia"
const gameStore = useGameStore()
const { score, best } = storeToRefs(gameStore)

const stats = computed(() => [
  { value: score, label: "score" },
  { value: best, label: "best" },
])
</script>