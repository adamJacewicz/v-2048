<template>
  <header class="flex gap-2">
    <div class="text-gray-600 flex-1">
      <h1 class="mb-5 text-7xl font-bold leading-16">2048</h1>
      <p class="text-lg">
        Join the tiles, get to <span class="font-bold">2048!</span>
      </p>
    </div>
    <Stats class="flex-1" />
  </header>
</template>
<script setup lang="ts">
import Stats from "./Stats.vue"

</script>

