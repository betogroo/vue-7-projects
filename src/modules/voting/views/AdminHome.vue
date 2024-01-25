<script setup lang="ts">
import { useVotingStore } from '../store/useVotingStore'
import { useConfig, useVoting, useVoters, useElection } from '../composables'

const { fetchCandidates, fetchVotes } = useVoting()
const { setConfig, fetchConfig } = useConfig()
const { fetchVoters } = useVoters()
const { getElection, addElection } = useElection()
await fetchCandidates()

const store = useVotingStore()
import { useConfigStore } from '../store/useConfigStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { Election } from '../types/Voting'

const configStore = useConfigStore()
const { config } = storeToRefs(configStore)

const enableVoting = async () => {
  console.log(111)
  setConfig({ ready: true, id: config.value!.id })
}
await fetchConfig()
await fetchVotes()

const election = ref<Election>({
  organization: '',
  name: '',
  description: '',
  date: '',
})

const handleAddElection = async () => {
  await addElection(election.value)
}
</script>

<template>
  <h1>Administração e Contabilização</h1>
  <v-list>
    <v-list-item
      v-for="item in store.candidates"
      :key="item.id"
      >{{ item.name }} {{ store.totalCandidateVote(item.id) }} votos
      <span v-if="store.totalVotes">
        {{
          Math.trunc(
            (store.totalCandidateVote(item.id) / store.totalVotes) * 100,
          )
        }}%
      </span>
    </v-list-item>
  </v-list>
  Total de votos: {{ store.totalVotes }}
  <v-btn :to="{ name: 'VotingHome' }">Voltar à Urna</v-btn>
  <v-btn @click="enableVoting">LiberarVoto</v-btn>
  <v-btn @click="fetchVoters">Log Voters</v-btn>
  <v-btn @click="getElection(7)">Log Election</v-btn>
  <v-btn @click="fetchConfig">Log Config</v-btn>

  <v-row>
    <v-col cols="6">
      <v-card title="Teste Cadastro Eleição">
        <v-form @submit.prevent="handleAddElection">
          <v-text-field
            v-model="election.organization"
            label="Nome da Organização"
          />
          <v-text-field
            v-model="election.name"
            label="Nome da Eleição"
          />
          <v-text-field
            v-model="election.description"
            label="Descrição"
          />
          <v-text-field
            v-model="election.date"
            label="Data da Eleição"
            type="date"
          />
          <v-btn type="submit">Cadastrar</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
