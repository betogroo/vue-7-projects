<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  NumericKeyboard,
  ActionKeyboard,
  DisplayCard,
  DisplayEnd,
} from '../components'
import { useVotingStore } from '../store/useVotingStore'
import { useVoting } from '../composables'
import { Candidate } from '../types/Voting'

const display = ref('')
const selectedCandidate = ref<Candidate | undefined>(undefined)
const resetDisplay = () => {
  display.value = ''
  selectedCandidate.value = undefined
}

const readyToVote = ref(true)

const store = useVotingStore()
const { addVote } = useVoting()

const confirmVote = async () => {
  await addVote(+display.value)
  store.setVote(+display.value)
  readyToVote.value = false
}

const enableVoting = () => {
  resetDisplay()
  readyToVote.value = true
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
        class="text-center d-flex align-center justify-center"
        cols="12"
        sm="8 "
      >
        <DisplayCard
          v-if="readyToVote"
          v-model="display"
          :candidate="selectedCandidate"
          :visible="suitorCard"
        />
        <template v-else>
          <DisplayEnd @release-vote="enableVoting" />
        </template>
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard
          :keyboard-disabled="suitorCard"
          @handle-click="updateDisplay"
        />
        <ActionKeyboard
          :confirm-disabled="!suitorCard || selectedCandidate === undefined"
          @handle-confirm="confirmVote"
          @handle-reset="resetDisplay"
        />
      </v-col>
    </v-row>
    <v-btn :to="{ name: 'AdminHome' }">Ver Votos</v-btn>
  </v-container>
</template>
