<script setup lang="ts">
import { computed } from 'vue'
import { useCandidateStore, useVotingStore, useElectionStore } from '../store'
const { candidates } = useCandidateStore()
const { votes, totalCandidateVote, totalElectionVotes } = useVotingStore()
const { election } = useElectionStore()

const reportTitle = computed(() => {
  if (votes.length) return 'Final'
  else return 'inicial'
})
</script>

<template>
  <v-container>
    <h1>{{ `Relatório ${reportTitle}` }}</h1>
    <v-card
      class="pa-3 ma-3"
      style="border: 2px dotted"
      variant="outlined"
    >
      <v-list
        v-if="candidates"
        lines="two"
      >
        <v-card-title>Data da Eleição: {{ election.date }}</v-card-title>
        <v-card-title
          >Total de Votos: {{ totalElectionVotes(election.id) }}</v-card-title
        >
        <v-list-item
          v-for="candidate in candidates"
          :key="candidate.id"
          :prepend-avatar="candidate.avatar"
        >
          {{ candidate.name }} -
          {{ totalCandidateVote(candidate.id!) }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
