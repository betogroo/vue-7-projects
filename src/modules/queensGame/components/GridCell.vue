<script setup lang="ts">
import { GridContent } from '../types/QueensGame'
interface Props {
  content?: GridContent
  color?: string
}
defineProps<Props>()
</script>

<template>
  <v-sheet
    border="opacity-100 sm"
    class="d-flex align-center justify-center pa-1 cursor-pointer"
    :color="color"
    height="28"
    max-width="28"
    width="28"
    ><v-img
      v-if="content === 'queen'"
      src="@/assets/queens_imgs/crown.png"
    ></v-img>
    <v-icon
      v-if="content === 'marked'"
      size="x-small"
      >mdi-circle</v-icon
    >
  </v-sheet>
</template>
