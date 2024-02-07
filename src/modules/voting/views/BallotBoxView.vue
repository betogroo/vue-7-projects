<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  NumericKeyboard,
  ActionKeyboard,
  DisplayCard,
  DisplayEnd,
} from '../components'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useElectionStore } from '../store/useElectionStore'
import { useVoting, useBallotBox } from '../composables'
import { Vote } from '../types/Voting'

//composable
const {
  numericDisplay,
  selectedCandidate,
  candidateCard, //
  addVote,
  resetDisplay,
  updateDisplay,
} = useVoting()
//const { setReady } = useElection()
const { setBallotBoxReady } = useBallotBox()
// const { getRandomVoter } = useVoters()

const ballotBoxStore = useBallotBoxStore()
const electionStore = useElectionStore()
const { election } = storeToRefs(electionStore)
const { ballotBox } = storeToRefs(ballotBoxStore)

const confirmVote = async () => {
  // const voter = await getRandomVoter() // only for test
  if (!election.value!.id || !selectedCandidate.value!.id) return
  const vote: Vote = {
    voter_id: ballotBox.value?.ready,
    election_id: election.value!.id,
    ballot_box_id: ballotBox.value!.id,
    candidate_id: selectedCandidate.value!.id,
  }
  const recordedVote = await addVote(vote)
  if (recordedVote) await setBallotBoxReady(ballotBox.value!.id, null)
  console.log(vote, recordedVote)
  resetDisplay()
}

console.log(ballotBox.value)
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
        <template v-if="!ballotBox?.ready">
          <DisplayEnd />
        </template>
        <DisplayCard
          v-else
          v-model="numericDisplay"
          :candidate="selectedCandidate"
          :numeric-display-length="+election!.candidate_number_length"
          :uppercase="election!.uppercase!"
          :visible="candidateCard"
        />
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard
          :keyboard-disabled="candidateCard || !ballotBox?.ready"
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
    <v-row>
      <v-col>id da urna: {{ ballotBox?.id }}</v-col>
      <v-col>id do votante: {{ ballotBox?.ready }}</v-col>
      <v-col>Candidato Selecionado: {{ selectedCandidate }}</v-col>
    </v-row>
  </v-container>
</template>
