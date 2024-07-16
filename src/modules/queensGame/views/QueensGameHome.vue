<script setup lang="ts">
import GridCell from '../components/GridCell.vue'
import { useQueensGame } from '../composables'
const { board, queens, createGame, onGridClick } = useQueensGame()
</script>

<template>
  <v-card
    class="d-flex flex-column justify-center mt-10"
    variant="outlined"
  >
    <div class="mx-auto">
      <div
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
        class="d-flex"
      >
        <div
          v-for="(grid, cellIndex) in row"
          :key="`${grid.section}-${cellIndex}`"
          class="d-flex"
        >
          <GridCell
            :color="grid.color"
            :content="grid.content"
            @handle-click="onGridClick(rowIndex, cellIndex)"
          />
        </div>
      </div>
    </div>
    <div class="d-flex mx-auto mt-2">
      <v-btn @click="createGame">Criar Jogo</v-btn>
      <v-btn @click="createGame">Resetar</v-btn>
    </div>
    <div>{{ queens.length }}</div>
  </v-card>
</template>
