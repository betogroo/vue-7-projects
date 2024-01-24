import { defineStore } from 'pinia'
import type { Config } from '../types/Voting'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const config = ref<Config>()
  return { config }
})
