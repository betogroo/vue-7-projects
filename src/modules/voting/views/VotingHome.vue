<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { BtnNumber } from '../components'

const btn = [9, 8, 7, 6, 5, 4, 3, 2, 1]
const display = ref('')

const updateDisplay = (value: number | string) => {
  if (display.value === '0') display.value = ''
  display.value += value
}

const suitorCard = computed<boolean>(() => display.value.length === 3)
</script>
<template>
  <v-container class="d-flex justify-center fill-height">
    <v-card>
      <v-row
        v-for="row in 3"
        :key="row"
        no-gutters
      >
        <v-col
          v-for="col in 3"
          :key="col"
          :order="col === 1 ? 'last' : col === 3 ? 'first' : ''"
        >
          <BtnNumber
            :disabled="suitorCard"
            :value="btn[(row - 1) * 3 + col - 1]"
            @handle-click="updateDisplay"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="text-center"
          ><BtnNumber
            :disabled="suitorCard"
            :value="0"
            @handle-click="updateDisplay"
        /></v-col>
      </v-row>
    </v-card>
    <v-card v-if="suitorCard">
      <v-alert>{{ display }}</v-alert>
    </v-card>

    {{ display }}
  </v-container>
</template>
