// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQueensGameStore = defineStore('queensGame', () => {
  const queensGame = ref('queensGame')
  return { queensGame }
})
