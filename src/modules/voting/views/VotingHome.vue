<script setup lang="ts">
import { computed, ref } from 'vue'
import { NumericKeyboard, ActionKeyboard, DisplayCard } from '../components'

const display = ref('')
const resetDisplay = () => {
  display.value = ''
}

const confirmVote = () => {
  console.log(display.value)
}

/* const displayConfig = ref({
  uppercaseText: true,
}) */

const updateDisplay = (value: number | string) => {
  if (display.value === '0') display.value = ''
  display.value += value
}

const suitorCard = computed<boolean>(() => display.value.length === 3)
/* const btnActions: BtnAction[] = [
  {
    color: 'white',
    text: 'Corrige',
    value: 'clear',
    action: resetDisplay,
    disabled: suitorCard.value,
  },
  {
    color: 'success',
    text: 'Confirma',
    value: 'confirm',
    action: confirmVote,
    disabled: !suitorCard.value,
  },
] */
</script>
<template>
  <v-container>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col cols="12">
        <v-sheet class="text-h4 text-uppercase text-center"
          >Nome da Escola</v-sheet
        >
      </v-col>
      <v-col
        class="text-center"
        cols="12"
        sm="8 "
      >
        <DisplayCard
          v-model="display"
          :visible="suitorCard"
        />
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard @handle-click="updateDisplay" />
        <ActionKeyboard
          @handle-confirm="confirmVote"
          @handle-reset="resetDisplay"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
