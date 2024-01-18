<script setup lang="ts">
import { useVotingStore } from '../store/useVotingStore'
import { useVoting } from '../composables'

const { fetchCandidates, fetchVotes } = useVoting()
await fetchCandidates()

const store = useVotingStore()
await fetchVotes()
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
</template>
