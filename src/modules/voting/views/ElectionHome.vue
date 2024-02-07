<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BallotBoxCard, BallotBoxForm, CandidateForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox, useCandidates } from '../composables'
import { Candidate } from '../types/Voting'

const { addBallotBox } = useBallotBox()
const { addCandidate } = useCandidates()

const electionStore = useElectionStore()
const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()

const { ballotsBox } = storeToRefs(ballotBoxStore)
const { election } = storeToRefs(electionStore)
const { voters } = storeToRefs(voterStore)

const handleSubmit = async (candidate: Candidate) => {
  addCandidate(candidate)
}
</script>

<template>
  <v-container v-if="election && election.id">
    <h1>Administração e Contabilização {{ election.id }}</h1>
    <h2>{{ election?.name }} ({{ election?.organization }})</h2>
    <h3>Data da Eleição: {{ election?.date }}</h3>
    <BallotBoxForm
      @handle-submit="(site) => addBallotBox(election!.id, site)"
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
      :candidate_number_length="election?.candidate_number_length"
      :election_id="election.id!"
      @add-candidate="(value) => handleSubmit(value)"
    />
  </v-container>
</template>
