<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NumericKeyboard, ActionKeyboard, DisplayCard } from '../components'
import { useVotingStore } from '../store/useVotingStore'
import { Candidate } from '../types/Voting'

const display = ref('')
const selectedCandidate = ref<Candidate | undefined>(undefined)
const resetDisplay = () => {
  display.value = ''
  selectedCandidate.value = undefined
}

const store = useVotingStore()

const confirmVote = () => {
  console.log(display.value)
  console.log(store.candidates)
}

const updateDisplay = (value: number | string) => {
  if (display.value === '0') display.value = ''
  display.value += value
}

watch(
  () => display.value,
  (newValue) => {
    selectedCandidate.value = undefined
    if (newValue.length === store.candidateNumberLength) {
      selectedCandidate.value = store.candidates.find(
        (candidate) => candidate.id === +display.value,
      )
      if (selectedCandidate.value) console.log(selectedCandidate.value)
    }
  },
)

const suitorCard = computed<boolean>(() => {
  return display.value.length === store.candidateNumberLength
})
</script>
<template>
  <v-container class="pa-1 ma-1">
    <v-row
      justify="center"
      no-gutters
    >
      <v-col cols="12">
        <v-sheet
          class="text-h4 text-center"
          :class="store.uppercase ? 'text-uppercase' : ''"
          >{{ store.institutionName }}</v-sheet
        >
      </v-col>
      <v-col
        class="text-center"
        cols="12"
        sm="8 "
      >
        <DisplayCard
          v-model="display"
          :candidate="selectedCandidate"
          :visible="suitorCard"
        />
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard
          :keyboard-disabled="suitorCard"
          @handle-click="updateDisplay"
        />
        <ActionKeyboard
          :confirm-disabled="!suitorCard"
          @handle-confirm="confirmVote"
          @handle-reset="resetDisplay"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
