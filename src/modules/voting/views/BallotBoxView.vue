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
import { useVoting, useVoters } from '../composables'
import { Vote } from '../types/Voting'
interface Props {
  id: string
}
defineProps<Props>()

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
const { getRandomVoter } = useVoters()

const ballotBoxStore = useBallotBoxStore()
const electionStore = useElectionStore()
const { election } = storeToRefs(electionStore)
const { ballotBox } = storeToRefs(ballotBoxStore)
const confirmVote = async () => {
  const voter = await getRandomVoter() // only for test
  if (!election.value!.id) return
  const vote: Vote = {
    voter_id: voter,
    election_id: election.value!.id,
    ballot_box_id: ballotBox.value!.id,
    candidate_id: +numericDisplay.value,
  }
  await addVote(vote)
  console.log(vote)
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
    <v-row>
      <v-col>id da urna: {{ ballotBox?.id }}</v-col>
    </v-row>
  </v-container>
</template>
