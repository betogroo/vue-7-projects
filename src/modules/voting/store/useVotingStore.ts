// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Candidate } from '../types/Voting'

export const useVotingStore = defineStore('voting', () => {
  const voting = ref('Voting')
  const candidateNumberLength = ref(3)
  const uppercase = ref(true)
  const institutionName = ref('Nome da Escola')
  const displayCardTitle = ref('Digite os números do grêmio que deseja votar')

  const candidates: Candidate[] = [
    {
      id: 111,
      name: 'Grêmio dos Cachorros',
    },
    {
      id: 222,
      name: 'Grêmio dos Gatos',
    },
    {
      id: 333,
      name: 'Grêmio dos Passarinhos',
    },
  ]

  return {
    voting,
    candidateNumberLength,
    uppercase,
    institutionName,
    displayCardTitle,
    candidates,
  }
})
