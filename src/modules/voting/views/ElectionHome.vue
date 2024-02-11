<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  BallotBoxCard,
  BallotBoxForm,
  CandidateForm,
  CandidateList,
} from '../components'
import { useElectionStore } from '../store/useElectionStore'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useCandidateStore } from '../store/useCandidateStore'
import { useBallotBox, useCandidates } from '../composables'
import { Candidate } from '../types/Voting'

// const { addBallotBox } = useBallotBox()
// const { addCandidate } = useCandidates()

const electionStore = useElectionStore()
const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()
const candidateStore = useCandidateStore()

const { ballotsBox } = storeToRefs(ballotBoxStore)
const { election } = storeToRefs(electionStore)
const { candidates } = storeToRefs(candidateStore)
const { voters } = storeToRefs(voterStore)

const handleCandidates = async (candidate: Candidate) => {
  await useCandidates().addCandidate(candidate)
  await useCandidates().fetchCandidates(candidate.election_id)
}

const handleBallotBox = async (election_id: number, site: string) => {
  await useBallotBox().addBallotBox(election_id, site)
  await useBallotBox().fetchBallotBox(election_id)
}
</script>

<template>
  <v-container v-if="election">
    <h1>Administração e Contabilização {{ election.id }}</h1>
    <h2>{{ election.name }} ({{ election.organization }})</h2>
    <h3>Data da Eleição: {{ election.date }}</h3>
    <BallotBoxForm
      @handle-submit="(site) => handleBallotBox(election.id!, site)"
    />
    <div class="d-flex flex-wrap justify-center">
      <BallotBoxCard :ballots-box="ballotsBox" />
    </div>
    <v-card
      title="Eleitores"
      variant="flat"
    >
      <v-card-text
        v-for="{ name, id } in voters"
        :key="id"
      >
        {{ name }}
      </v-card-text>
    </v-card>
    <CandidateForm
      :candidate_number_length="election.candidate_number_length"
      :election_id="election.id!"
      @add-candidate="(value) => handleCandidates(value)"
    />
    <CandidateList :candidates="candidates" />
  </v-container>
  <v-container v-else>Nada a Mostrar</v-container>
</template>
