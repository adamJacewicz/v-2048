<template>
  <div
    v-if="isGameOver"
    class="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-black bg-opacity-60 text-3xl font-bold tracking-wide text-gray-200"
  >
    Game over!
  </div>
</template>

<script setup lang="ts">
import use2048 from "../composables/use-2048"
import { toRefs } from "vue"
const { isGameOver } = toRefs(use2048())
</script>
