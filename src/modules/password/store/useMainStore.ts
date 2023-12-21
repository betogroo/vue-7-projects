// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePasswordStore = defineStore('password', () => {
  const password = ref('password')
  return { password }
})
