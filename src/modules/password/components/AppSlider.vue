<script setup lang="ts">
import { computed, ref } from 'vue'

const sliderLength = defineModel<number>()
//const sliderLength = ref<number>(6)

const color = computed(() => {
  if (!sliderLength.value) return 'red'
  if (sliderLength.value < 8) return 'red'
  if (sliderLength.value < 12) return 'yellow'
  return 'green'
})
</script>

<template>
  <v-row align="center">
    <v-col> Tamanho da Senha </v-col>
    <v-col>
      <v-slider
        v-model="sliderLength"
        :color="color"
        hide-details
        max="32"
        min="1"
        :step="1"
        track-color="grey"
      >
        <template #append>
          <div
            class="text-h4"
            :class="`text-${color}`"
          >
            {{ sliderLength }}
          </div>
        </template>
      </v-slider>
    </v-col>
  </v-row>
</template>
