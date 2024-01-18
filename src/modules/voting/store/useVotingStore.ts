// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Candidate, Votes } from '../types/Voting'

export const useVotingStore = defineStore('voting', () => {
  const voting = ref('Voting')
  const candidateNumberLength = ref(3)
  const uppercase = ref(true)
  const institutionName = ref('Nome da Escola')
  const displayCardTitle = ref('Digite os números do grêmio que deseja votar')
  const password = ref('112233445566')

  const votes = ref<Votes>([])

  const setVote = (idCandidate: number) => {
    votes.value.push({ candidate_id: idCandidate })
  }

  const totalVotes = computed<number>(() => votes.value.length)

  const totalCandidateVote = computed(() => (idCandidate: number) => {
    return votes.value.filter((item) => item.candidate_id === idCandidate)
      .length
  })

  const candidates: Candidate[] = []

  return {
    voting,
    votes,
    candidateNumberLength,
    uppercase,
    institutionName,
    displayCardTitle,
    candidates,
    totalVotes,
    setVote,
    totalCandidateVote,
    password,
  }
})
