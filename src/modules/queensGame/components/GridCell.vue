<script setup lang="ts">
import { GridContent } from '../types/QueensGame'
interface Props {
  content?: GridContent
  color?: string
}
defineProps<Props>()

const $emit = defineEmits<{
  handleClick: []
}>()

const handleClick = () => {
  $emit('handleClick')
}
</script>

<template>
  <v-sheet
    border="opacity-100 sm"
    class="d-flex align-center justify-center pa-1 cursor-pointer"
    :color="color"
    height="50"
    max-width="50"
    width="50"
    @click="handleClick"
    ><v-img
      v-if="content === 'queen'"
      cover
      src="@/assets/queens_imgs/crown.png"
      :width="10"
    ></v-img>
    <v-icon
      v-if="content === 'marked'"
      size="small"
      >mdi-circle</v-icon
    >
  </v-sheet>
</template>
