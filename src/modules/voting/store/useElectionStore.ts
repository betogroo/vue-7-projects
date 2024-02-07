import { defineStore } from 'pinia'
import type { Election } from '../types/Voting'
import { computed, ref } from 'vue'

export const useElectionStore = defineStore('election', () => {
  const elections = ref<Election[]>([])
  const election = ref<Election>({
    id: undefined,
    created_at: undefined,
    candidate_number_length: 3,
    date: '',
    description: '',
    name: '',
    organization: '',
    ready: false,
    uppercase: false,
  })

  const totalElections = computed(() => elections.value.length)
  return { election, elections, totalElections }
})
