import { defineStore } from 'pinia'
import { ref } from 'vue'
import { BallotBox } from '../types/Voting'

export const useBallotBoxStore = defineStore('ballotBox', () => {
  const ballotBox = ref<BallotBox>()

  return { ballotBox }
})
