import { ref } from 'vue'

const usePassword = () => {
  const isPending = ref(false)
  const error = ref(null)
  return { isPending, error }
}

export default usePassword
