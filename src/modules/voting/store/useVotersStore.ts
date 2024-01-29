import { defineStore } from 'pinia'
import type { Voter } from '../types/Voting'
import { ref } from 'vue'

export const useVoterStore = defineStore('voter', () => {
  const voters = ref<Voter[]>([])

  const randomVoter = (): string => {
    const index = Math.floor(Math.random() * voters.value.length)
    return voters.value[index].id
  }

  return { voters, randomVoter }
})
