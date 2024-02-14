import { defineStore } from 'pinia'
import { ref } from 'vue'
import { BallotBox } from '../types/Voting'

export const useBallotBoxStore = defineStore('ballotBox', () => {
  const ballotBox = ref<BallotBox>({
    id: '',
    created_at: '',
    election_id: '',
    ready: null,
    site: '',
  })
  const ballotsBox = ref<BallotBox[]>([])

  return { ballotBox, ballotsBox }
})
