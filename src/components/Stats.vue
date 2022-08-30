<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <div
        v-for="item in stats"
        :key="item.label"
        class="flex-1 rounded-md bg-primary-500 py-2 px-4 text-center font-bold uppercase text-primary-800"
      >
        <div class="text-sm">{{ item.label }}</div>
        <div class="text-primary-100 text-lg leading-5">
          {{ item.value }}
        </div>
      </div>
    </div>
    <Button @click="initGame" class="ml-auto mt-2"> New game </Button>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue"
import { useTransition } from "@vueuse/core"
import Button from "./Button.vue"
import { useGame } from "../stores/game"
const labels = ["score", "best"]
const { score, best, initGame } = toRefs(useGame())

const data = useTransition(
  computed(() => [score.value, best.value]),
  {
    duration: 100,
  }
)

const stats = computed(() =>
  data.value.map((value, i) => ({
    label: labels[i],
    value: value.toFixed(0),
  }))
)
</script>
