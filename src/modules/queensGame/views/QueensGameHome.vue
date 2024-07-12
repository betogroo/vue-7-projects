<script setup lang="ts">
import GridCell from '../components/GridCell.vue'
import { useQueensGame } from '../composables'
const { resetBoard, onGridClick, boardState } = useQueensGame()
</script>

<template>
  <v-sheet
    class="mx-auto mt-8"
    width="600"
  >
    <div class="d-flex">
      <div
        v-for="(n, i) in boardState"
        :key="i"
        class="flex-item"
      >
        <GridCell
          color="blue"
          :content="n"
          @handle-click="onGridClick(i, n)"
        />
      </div>
    </div>
    <v-btn @click="resetBoard">Resetar</v-btn>
  </v-sheet>
</template>
