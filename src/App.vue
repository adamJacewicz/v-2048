<template>
  <div class="xs:max-w-lg max-w-xs flex flex-col gap-4">
    <Header />
    <Board />
    <Manual />
  </div>
  <Teleport defer to="#board">
    <GameOver v-if="isGameOver" />
  </Teleport>
</template>
<script setup lang="ts">
import Board from "components/Board.vue"
import Header from "components/Header.vue"
import Manual from "components/Manual.vue"
import { useGame } from "./use-game"
import { onKeyStroke, useSwipe } from "@vueuse/core"
import { MoveKeyType } from "./types"
import { arrowKeyList } from "./constants"
import GameOver from "components/GameOver.vue"

const { move, updateScore, isGameOver } = useGame()
const onMove = (direction: MoveKeyType) => {
  const score = move(direction)
  updateScore(score)
}


useSwipe(document, {
  onSwipeEnd: (_ev, direction) => onMove(direction),
  threshold: 10
})

onKeyStroke(arrowKeyList, (event) => onMove(event.key as MoveKeyType))

</script>
