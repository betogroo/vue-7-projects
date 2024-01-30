// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Candidate, Vote } from '../types/Voting'

export const useVotingStore = defineStore('voting', () => {
  // config
  const candidateNumberLength = ref(3)
  const displayCardTitle = ref('Digite os números do grêmio que deseja votar')

  const votes = ref<Vote[]>([])
  const candidates = ref<Candidate[]>([])

  const setVote = (vote: Vote) => {
    votes.value.push(vote)
  }

  const totalVotes = computed<number>(() => votes.value.length)

  const totalCandidateVote = computed(() => (candidate_id: number) => {
    return votes.value.filter((item) => item.candidate_id === candidate_id)
      .length
  })

  // const candidates: Candidate[] = []

  return {
    votes,
    candidateNumberLength,
    displayCardTitle,
    candidates,
    totalVotes,
    setVote,
    totalCandidateVote,
  }
})
