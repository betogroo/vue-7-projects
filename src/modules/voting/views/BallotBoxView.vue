<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Vote } from '../types/Voting'
import {
  NumericKeyboard,
  ActionKeyboard,
  DisplayCard,
  DisplayEnd,
} from '../components'
import { useVoting, useBallotBox, useHelpers } from '../composables'
import { useBallotBoxStore, useElectionStore } from '../store'
import { useSound } from '@vueuse/sound'
import confirmSound from '@/assets/voting_sounds/confirm.wav'

//composable
const {
  numericDisplay,
  selectedCandidate,
  candidateCard,
  addVote,
  resetDisplay,
  updateDisplay,
} = useVoting()
const { setBallotBoxReady } = useBallotBox()
const { delay } = useHelpers()
const { play } = useSound(confirmSound)

const ballotBoxStore = useBallotBoxStore()
const { ballotBox } = storeToRefs(ballotBoxStore)
const electionStore = useElectionStore()
const { election } = storeToRefs(electionStore)

const confirmVote = async () => {
  if (!election.value!.id || !selectedCandidate.value!.id) return
  const vote: Vote = {
    voter_id: 'a981b48a-72e5-4dec-878b-837c164cede6',
    election_id: election.value!.id,
    ballot_box_id: ballotBox.value!.id,
    candidate_id: selectedCandidate.value!.id,
  }
  const recordedVote = await addVote(vote)
  if (recordedVote) {
    play()
    await setBallotBoxReady(ballotBox.value!.id, null)
  }
  await delay(5000)
  setBallotBoxReady(ballotBox.value!.id, 'dc5e18db-c593-41fc-8c4c-3c58376fd88c')
  console.log(vote, recordedVote)
  resetDisplay()
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
  </v-container>
</template>
