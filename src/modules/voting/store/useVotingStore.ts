// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVotingStore = defineStore('voting', () => {
  const voting = ref('Voting')
  return { voting }
})
