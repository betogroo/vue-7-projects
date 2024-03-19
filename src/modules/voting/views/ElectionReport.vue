<script setup lang="ts">
import { computed } from 'vue'
import { useCandidateStore, useVotingStore } from '../store'
const { candidates } = useCandidateStore()
const { votes, totalCandidateVote } = useVotingStore()

const reportTitle = computed(() => {
  if (votes.length) return 'Final'
  else return 'inicial'
})
</script>

<template>
  <div>{{ `Relatório ${reportTitle}` }}</div>
  <v-list v-if="candidates">
    <v-list-item
      v-for="candidate in candidates"
      :key="candidate.id"
      >{{ candidate.name }} -
      {{ totalCandidateVote(candidate.id!) }}</v-list-item
    >
  </v-list>
</template>
