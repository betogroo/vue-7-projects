<script setup lang="ts">
import {
  NumericKeyboard,
  ActionKeyboard,
  DisplayCard,
  DisplayEnd,
} from '../components'
import { useVoting, useElection } from '../composables'
import { storeToRefs } from 'pinia'
import { useElectionStore } from '../store/useElectionStore'

const electionStore = useElectionStore()
const { election } = storeToRefs(electionStore)

// composables
const {
  numericDisplay,
  selectedCandidate,
  candidateCard, //
  addVote,
  resetDisplay,
  updateDisplay,
} = useVoting()
const { setReady } = useElection()

const confirmVote = async () => {
  await addVote(+numericDisplay.value, 7)
  await setReady(7, false)
}
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
          :class="election?.uppercase ? 'text-uppercase' : ''"
          >{{ election?.organization }}</v-sheet
        >
      </v-col>
      <v-col
        class="text-center d-flex align-center justify-center"
        cols="12"
        sm="8 "
      >
        <template v-if="!election?.ready">
          <DisplayEnd />
        </template>
        <DisplayCard
          v-else
          v-model="numericDisplay"
          :candidate="selectedCandidate"
          :numeric-display-length="election.candidate_number_length"
          :uppercase="election.uppercase!"
          :visible="candidateCard"
        />
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard
          :keyboard-disabled="candidateCard || !election?.ready"
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
    <v-btn :to="{ name: 'AdminHome' }">Admin</v-btn>
  </v-container>
</template>
