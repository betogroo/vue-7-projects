<script setup lang="ts">
import { computed, ref } from 'vue'

//reactive
const length = ref<number>(6)

//methods
const decrement = () => {
  length.value--
}
const increment = () => {
  length.value++
}

//computed
const color = computed(() => {
  //refactor
  if (length.value < 8) return 'red'
  if (length.value > 10) return 'teal'
  if (length.value > 12) return 'green'
  if (length.value > 16) return 'orange'
  return 'blue'
})
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <h1>Password Generator</h1>
    <v-row>
      <v-col>
        <v-slider
          v-model="length"
          :color="color"
          max="32"
          min="1"
          :step="1"
          track-color="grey"
        >
          <template #prepend>
            <h3>Tamanho da Senha</h3>
          </template>
          <template #append>
            <v-text-field
              v-model="length"
              density="compact"
              hide-details
              single-line
              style="width: 50px"
              variant="outlined"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>
