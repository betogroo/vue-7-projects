<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BallotBoxCard, BallotBoxForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox, useCandidates } from '../composables'
import { ref } from 'vue'
import { Candidate } from '../types/Voting'

interface Props {
  id: number
}

const props = defineProps<Props>()

const { addBallotBox } = useBallotBox()
const { addCandidate } = useCandidates()

const electionStore = useElectionStore()
const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()

const { ballotsBox } = storeToRefs(ballotBoxStore)
const { election } = storeToRefs(electionStore)
const { voters } = storeToRefs(voterStore)

const formData = ref<Candidate>({
  avatar: 'sss',
  election_id: props.id,
  name: '',
  candidate_number: '',
})
const handleSubmit = async () => {
  await addCandidate(formData.value)
}
</script>

<template>
  <h1>Administração e Contabilização {{ id }}</h1>
  <h2>{{ election?.name }} ({{ election?.organization }})</h2>
  <h3>Data da Eleição: {{ election?.date }}</h3>

  <BallotBoxForm @handle-submit="(site) => addBallotBox(id, site)" />
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
  <v-card title="Inserir Candidatos">
    <v-form @submit.prevent="handleSubmit">
      <v-otp-input
        v-model="formData.candidate_number"
        :length="election?.candidate_number_length"
      ></v-otp-input>
      <v-text-field v-model="formData.name"></v-text-field>
      <v-btn type="submit">Cadastrar</v-btn>
    </v-form>
  </v-card>
</template>
