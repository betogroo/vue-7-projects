import { defineStore } from 'pinia'
import { Candidate } from '../types/Voting'
import { computed, ref } from 'vue'

export const useCandidateStore = defineStore('candidate', () => {
  const candidate = ref<Candidate>()
  const candidates = ref<Candidate[]>([])

  const formatCandidate = computed(() => (id: string) => {
    const filteredCandidate = candidates.value.find(
      (candidate) => candidate.id === id,
    )
    if (!filteredCandidate) return
    return `${filteredCandidate.name} (${filteredCandidate.candidate_number}) `
  })

  return { candidate, candidates, formatCandidate }
})
