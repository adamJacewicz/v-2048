<template>
  <div class="flex flex-col">
    <div class="flex">
      <div
        v-for="item in stats"
        :key="item.label"
        class="flex flex-1 flex-col rounded-md bg-brown-400 p-2 text-center uppercase text-gray-100 last-of-type:ml-2"
      >
        <div>{{ item.label }}</div>
        <div class="text-2xl leading-6">
          {{ item.value }}
        </div>
      </div>
    </div>
    <button
      @click="reset"
      class="mt-2 rounded-md border bg-brown-600 p-2 text-sm text-gray-100 sm:text-lg"
    >
      New game
    </button>
  </div>
</template>
<script setup lang="ts">
import { useGame } from "../stores/game"
import { computed, ref } from "vue"
import { storeToRefs } from "pinia"
import { useTransition } from "@vueuse/core"
const game = useGame()
const { reset } = game
const { score, best } = storeToRefs(game)

const points = ref([score, best])
const labels = ["score", "best"]

const data = useTransition(points.value, {
  duration: 100,
})
const stats = computed(() =>
  data.value.map((value, i) => ({
    label: labels[i],
    value: value.toFixed(0),
  }))
)
</script>
