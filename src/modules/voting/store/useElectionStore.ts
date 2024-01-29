import { defineStore } from 'pinia'
import type { Election } from '../types/Voting'
import { computed, ref } from 'vue'

export const useElectionStore = defineStore('election', () => {
  const elections = ref<Election[]>([])
  const election = ref<Election>()

  const totalElections = computed(() => elections.value.length)
  return { election, elections, totalElections }
})
