import { defineStore } from 'pinia'
import { Candidate } from '../types/Voting'
import { ref } from 'vue'

export const useCandidateStore = defineStore('candidate', () => {
  const candidate = ref<Candidate>()
  const candidates = ref<Candidate[]>([])

  return { candidate, candidates }
})
