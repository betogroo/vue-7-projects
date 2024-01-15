// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVotingStore = defineStore('voting', () => {
  const voting = ref('Voting')
  const candidateNumberLength = ref(3)
  const uppercase = ref(true)
  return { voting, candidateNumberLength, uppercase }
})
