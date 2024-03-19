<script setup lang="ts">
import { computed } from 'vue'
import { useCandidateStore, useVotingStore, useElectionStore } from '../store'
const { candidates, formatCandidate } = useCandidateStore()
const {
  votes,
  totalCandidateVote: _totalCandidateVote,
  totalElectionVotes,
} = useVotingStore()
const { election } = useElectionStore()

const reportTitle = computed(() => {
  if (votes.length) return 'Final'
  else return 'Inicial'
})

const formattedCandidates = computed(() => {
  const winnerCandidate = candidates.reduce((prev, current) => {
    const totalVotesPrev = _totalCandidateVote(prev.id!)
    const totalVotesCurrent = _totalCandidateVote(current.id!)
    return totalVotesCurrent > totalVotesPrev ? current : prev
  })

  const serializedCandidates = candidates.map((item) => {
    const totalVotes = _totalCandidateVote(item.id!)
    const isWinner = item.id! === winnerCandidate.id
    return {
      id: item.id,
      candidate: item.name,
      avatar: item.avatar,
      number: item.candidate_number,
      votes: totalVotes,
      isWinner,
      percent: ((totalVotes / totalElectionVotes(election.id!)) * 100).toFixed(
        2,
      ),
    }
  })

  return serializedCandidates
})
</script>

<template>
  <v-container class="d-flex flex-column align-center">
    <h1>{{ `Relatório ${reportTitle}` }}</h1>
    <v-card
      class="pa-3 ma-3"
      style="border: 2px dotted"
      variant="outlined"
    >
      <v-list
        v-if="formattedCandidates.length"
        lines="two"
      >
        <v-card-title>Data da Eleição: {{ election.date }}</v-card-title>
        <v-card-title
          >Total de Votos: {{ totalElectionVotes(election.id) }}</v-card-title
        >
        <v-list-item
          v-for="candidate in formattedCandidates"
          :key="candidate.id"
          :base-color="candidate.isWinner ? 'green' : 'red'"
          class="mx-6"
          :prepend-avatar="candidate.avatar"
        >
          <template #append
            ><div class="ml-6">
              {{ `${candidate.votes} votos (${candidate.percent}%)` }}
            </div></template
          >
          {{ formatCandidate(candidate.id!) }}
          {{ candidate.isWinner ? '(Vencedor)' : '' }}
        </v-list-item>
      </v-list>
    </v-card>
    <v-sheet>
      Relatório Gerado em
      {{ Date.now() }}
    </v-sheet>
  </v-container>
</template>
