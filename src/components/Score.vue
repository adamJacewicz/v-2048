<template>
  <div class="flex justify-end text-sm font-medium uppercase text-gray-100">
    <div
      v-for="item in results"
      :key="item.label"
      class="ml-2 max-w-[100px] flex-1 rounded-md border-0 bg-brown-400 py-2 px-4 text-center"
    >
      <div>{{ item.label }}</div>
      <div class="text-2xl leading-6">{{ item.value }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()

const results = computed(() => [
  { value: gameStore.score, label: 'Score' },
  { value: gameStore.best, label: 'Best' },
])
</script>
