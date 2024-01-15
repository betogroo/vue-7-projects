// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVotingStore = defineStore('voting', () => {
  const voting = ref('Voting')
  const candidateNumberLength = ref(3)
  const uppercase = ref(true)
  const institutionName = ref('Nome da Escola')
  const displayCardTitle = ref('Digite os números do grêmio que deseja votar')

  return {
    voting,
    candidateNumberLength,
    uppercase,
    institutionName,
    displayCardTitle,
  }
})
