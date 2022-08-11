<template>
  <div class="flex flex-col">
    <div class="flex">
      <div
        v-for="item in stats"
        :key="item.label"
        class="flex flex-1 flex-col rounded-md bg-brown-400 p-2 text-center text-gray-100 last-of-type:ml-2"
      >
        <div>{{ item.label }}</div>
        <div class="text-2xl leading-6">
          {{ item.value }}
        </div>
      </div>
    </div>
    <button
      @click="gameStore.init"
      class="rounded-md mt-2 border bg-brown-600 p-2 text-sm text-gray-100 sm:text-lg"
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
