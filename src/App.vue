<template>
  <div class="xs:max-w-lg max-w-xs flex flex-col gap-4">
    <Header />
    <Board />
    <Manual />
  </div>
</template>
<script setup
        lang="ts">
import Board from "./components/Board.vue"
import Header from "./components/Header.vue"
import Manual from "./components/Manual.vue"
import { useGame } from "./use-game"
import { onKeyStroke, useSwipe } from "@vueuse/core"
import { MoveKeyType } from "./types"
import { arrowKeyList } from "./constants"

const { move, addTile, updateScore } = useGame()

const onMove = (direction: MoveKeyType) => {
  const { isUpdated, score } = move(direction)
  updateScore(score)
  isUpdated && addTile()
}

useSwipe(document, {
  onSwipeEnd: (_event, direction) => onMove(direction),
  threshold: 10
})

onKeyStroke(arrowKeyList, (event) => onMove(event.key as MoveKeyType))

</script>
