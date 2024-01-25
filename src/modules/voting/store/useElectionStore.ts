import { defineStore } from 'pinia'
import type { Election } from '../types/Voting'
import { ref } from 'vue'

export const useElectionStore = defineStore('election', () => {
  const election = ref<Election>()
  return { election }
})
