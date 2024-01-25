// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Candidate, Votes } from '../types/Voting'

export const useVotingStore = defineStore('voting', () => {
  // config
  const candidateNumberLength = ref(3)
  const institutionName = ref('Nome da Escola')
  const displayCardTitle = ref('Digite os números do grêmio que deseja votar')
  const password = ref('112233445566')
  const readyToVote = ref(true)

  const votes = ref<Votes>([])

  const setVote = (candidate_id: number, election_id: number) => {
    votes.value.push({ candidate_id, election_id })
  }

  const totalVotes = computed<number>(() => votes.value.length)

  const totalCandidateVote = computed(() => (candidate_id: number) => {
    return votes.value.filter((item) => item.candidate_id === candidate_id)
      .length
  })

  const candidates: Candidate[] = []

  return {
    votes,
    candidateNumberLength,
    institutionName,
    displayCardTitle,
    candidates,
    totalVotes,
    setVote,
    totalCandidateVote,
    readyToVote,
    password,
  }
})
