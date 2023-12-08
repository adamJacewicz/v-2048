<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-1 xs:gap-2">
      <div
        v-for="item in stats"
        :key="item.label"
        class="min-w-[min(50%,65px)] flex-1 rounded-md bg-primary-500 p-2 text-center font-bold uppercase"
      >
        <h5 class="text-sm text-primary-800">{{ item.label }}</h5>
        <p class="text-lg leading-6 text-primary-50">
          {{ item.value }}
        </p>
      </div>
    </div>
    <Button class="self-end font-medium"
            @click="initGame">New game
    </Button>
  </div>
</template>
<script setup
        lang="ts">
import { computed, reactive, inject } from "vue"
import { useTransition } from "@vueuse/core"
import Button from "./Button.vue"
import { GameStore } from "../game.types"

const { score, best, initGame } = inject<GameStore>("game") as GameStore
const scores = reactive([score, best])

const scoresTransition = useTransition(scores, {
  duration: 100
})

const stats = computed(() =>
  ["score", "best"].map((label, i) => ({
    label,
    value: scoresTransition.value[i].toFixed(0)
  }))
)
</script>
