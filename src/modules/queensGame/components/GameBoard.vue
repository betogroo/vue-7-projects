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
  onGridClick: [rowIndex: number, cellIndex: number]
}>()

const onGridClick = (rowIndex: number, cellIndex: number) => {
  $emit('onGridClick', rowIndex, cellIndex)
}

const isValidQueen = computed(() => (rowIndex: number, cellIndex: number) => {
  return props.queens.some(
    (queen) =>
      queen.row === rowIndex && queen.col === cellIndex && !queen.valid,
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
        v-for="(grid, cellIndex) in row"
        :key="`${grid.section}-${cellIndex}`"
        class="d-flex"
      >
        <GridCell
          :color="grid.color"
          :content="grid.content"
          :invalid="isValidQueen(rowIndex, cellIndex)"
          @handle-click="onGridClick(rowIndex, cellIndex)"
        />
      </div>
    </div>
  </div>
</template>
