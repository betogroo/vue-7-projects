<script setup lang="ts">
import type { Board } from '../types/QueensGame'
import { GridCell } from '.'

interface Props {
  board: Board
}
defineProps<Props>()

const $emit = defineEmits<{
  onGridClick: [rowIndex: number, cellIndex: number]
}>()

const onGridClick = (rowIndex: number, cellIndex: number) => {
  $emit('onGridClick', rowIndex, cellIndex)
}
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
          @handle-click="onGridClick(rowIndex, cellIndex)"
        />
      </div>
    </div>
  </div>
</template>
