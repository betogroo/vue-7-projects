<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  length?: number
  content: string | undefined
}
const props = withDefaults(defineProps<Props>(), {
  length: 3,
})

const display = computed(() => {
  return props.content?.split('')
})
</script>

<template>
  <div class="d-flex align-center">
    <v-sheet
      v-for="i in length"
      :key="i"
      class="d-flex align-center justify-center pa-1 ma-1 border"
      :height="50"
      :width="50"
      >{{ display![i - 1] }}</v-sheet
    >
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 3px solid red;
}
</style>
