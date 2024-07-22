<script setup lang="ts">
import { GameBoard } from '../components'
import { useQueensGame } from '../composables'
const { error, board, queens, createGame, onGridClick, resetBoard } =
  useQueensGame()
</script>

<template>
  <v-card
    class="d-flex flex-column justify-center mt-10"
    variant="outlined"
  >
    <div class="d-flex mx-auto mt-2">
      <v-btn @click="createGame">Criar Jogo</v-btn>
      <v-btn @click="resetBoard">Resetar</v-btn>
    </div>

    <GameBoard
      :board="board"
      :queens="queens"
      @on-grid-click="onGridClick"
    />
    <div>{{ queens.length }}</div>
    <div>{{ error }}</div>
  </v-card>
</template>
