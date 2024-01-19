<script setup lang="ts">
import {
  NumericKeyboard,
  ActionKeyboard,
  DisplayCard,
  DisplayEnd,
} from '../components'
import { useVotingStore } from '../store/useVotingStore'
import { useVoting } from '../composables'
// import { Candidate } from '../types/Voting'

//const display = ref('')
//const selectedCandidate = ref<Candidate | undefined>(undefined)

/* const resetDisplay = () => {
  numericDisplay.value = ''
  selectedCandidate.value = undefined
} */

/* const updateDisplay = (value: number | string) => {
  numericDisplay.value += value
} */
// const readyToVote = ref(true)

/* const enableVoting = () => {
  resetDisplay()
  readyToVote.value = true
} */

/* watch(
  () => numericDisplay.value,
  (newValue) => {
    selectedCandidate.value = undefined
    if (newValue.length === store.candidateNumberLength) {
      selectedCandidate.value = store.candidates.find(
        (candidate) => candidate.id === +numericDisplay.value,
        )
      }
    },
    ) */
/* const candidateCard = computed<boolean>(() => {
      return numericDisplay.value.length === store.candidateNumberLength
    }) */

const store = useVotingStore()
// composable
const {
  numericDisplay,
  readyToVote,
  selectedCandidate,
  candidateCard,
  addVote,
  enableVoting,
  fetchCandidates,
  resetDisplay,
  updateDisplay,
} = useVoting()

const confirmVote = async () => {
  await addVote(+numericDisplay.value)
}

await fetchCandidates()
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
          v-model="numericDisplay"
          :candidate="selectedCandidate"
          :visible="candidateCard"
        />
        <template v-else>
          <DisplayEnd @release-vote="enableVoting" />
        </template>
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard
          :keyboard-disabled="candidateCard"
          @handle-click="updateDisplay"
        />
        <ActionKeyboard
          :confirm-disabled="!candidateCard || selectedCandidate === undefined"
          :reset-disabled="!numericDisplay.length"
          @handle-confirm="confirmVote"
          @handle-reset="resetDisplay"
        />
      </v-col>
    </v-row>
    <v-btn :to="{ name: 'AdminHome' }">Ver Votos</v-btn>
  </v-container>
</template>
