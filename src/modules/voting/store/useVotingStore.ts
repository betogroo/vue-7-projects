// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Candidate } from '../types/Voting'

export const useVotingStore = defineStore('voting', () => {
  const voting = ref('Voting')
  const candidateNumberLength = ref(3)
  const uppercase = ref(true)
  const institutionName = ref('Nome da Escola')
  const displayCardTitle = ref('Digite os números do grêmio que deseja votar')
  const password = ref('112233445566')

  const votes = ref<number[]>([])

  const setVote = (idCandidate: number) => {
    votes.value.push(idCandidate)
  }

  const totalVotes = computed<number>(() => votes.value.length)

  const totalCandidateVote = computed(() => (idCandidate: number) => {
    return votes.value.filter((id) => id === idCandidate).length
  })

  const candidates: Candidate[] = [
    {
      id: 111,
      name: 'Grêmio dos Cachorros',
      avatar: 'https://th.bing.com/th/id/OIG.5asg2sze5JPEFgB_m8v0?pid=ImgGn',
    },
    {
      id: 222,
      name: 'Grêmio dos Gatos',
      avatar:
        'https://th.bing.com/th/id/OIG.Pm6TceMZjAql5dj6yiQB?w=1024&h=1024&rs=1&pid=ImgDetMain',
    },
    {
      id: 333,
      name: 'Grêmio dos Passarinhos',
      avatar:
        'https://th.bing.com/th/id/OIG.4i381yryCo5.5FCupq0r?w=1024&h=1024&rs=1&pid=ImgDetMain',
    },
  ]

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
