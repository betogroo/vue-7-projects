<script setup lang="ts">
import type { Board, Queen } from '../types/QueensGame'
import { GridCell } from '.'
import { computed } from 'vue'

interface Props {
  board: Board
  queens: Queen[]
}
const props = defineProps<Props>()

const $emit = defineEmits<{
  onGridClick: [rowIndex: number, colIndex: number]
}>()

const onGridClick = (rowIndex: number, colIndex: number) => {
  $emit('onGridClick', rowIndex, colIndex)
}

const isValidQueen = computed(() => (rowIndex: number, colIndex: number) => {
  return props.queens.some(
    (queen) => queen.row === rowIndex && queen.col === colIndex && !queen.valid,
  )
})
</script>

<template>
  <div class="mx-auto">
    <div
      v-for="(row, rowIndex) in board"
      :key="rowIndex"
      class="d-flex"
    >
      <div
        v-for="(grid, colIndex) in row"
        :key="`${grid.section}-${colIndex}`"
        class="d-flex"
      >
        <GridCell
          :color="grid.color"
          :content="grid.content"
          :invalid="isValidQueen(rowIndex, colIndex)"
          @handle-click="onGridClick(rowIndex, colIndex)"
        />
      </div>
    </div>
  </div>
</template>
