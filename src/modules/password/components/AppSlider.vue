<script setup lang="ts">
import { computed } from 'vue'
import type { colors } from '../types/Password'

const sliderLength = defineModel<number>()

const color = computed<colors>(() => {
  if (!sliderLength.value) return 'error'
  if (sliderLength.value < 8) return 'error'
  if (sliderLength.value < 12) return 'warning'
  return 'success'
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
