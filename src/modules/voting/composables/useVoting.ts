import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema } from '../types/Voting'
import { useVotingStore } from '../store/useVotingStore'
// import { useConfigStore } from '../store/useConfigStore'
import { computed, ref, watch } from 'vue'
//import { useConfig } from '.'
//const { setConfig } = useConfig()

const useVoting = () => {
  const store = useVotingStore()
  //const configStore = useConfigStore()

  const numericDisplay = ref('')
  const selectedCandidate = ref<Candidate | undefined>(undefined)
  // const readyToVote = ref(true)

  const resetDisplay = () => {
    numericDisplay.value = ''
    selectedCandidate.value = undefined
  }

  const updateDisplay = (value: number | string) => {
    numericDisplay.value += value
  }

  const enableVoting = () => {
    resetDisplay()
    store.readyToVote = true
  }

  const addVote = async (candidate_id: number) => {
    try {
      const { error: err } = await supabase
        .from('votes')
        .insert({ candidate_id })

      if (err) throw Error('Não foi possível votar')
      //await setConfig({ ready: false, id: configStore.config?.id })
      resetDisplay()
      store.setVote(candidate_id)
      //store.readyToVote = false
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const fetchVotes = async () => {
    try {
      const { data, error: err } = await supabase.from('votes').select('*')
      if (err) throw err
      store.votes = data
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const fetchCandidates = async () => {
    try {
      const { data, error: err } = await supabase
        .from('candidates')
        .select('*')
        .order('name')
        .returns<Candidate[]>()
      if (err) throw err
      if (data) {
        const parsedData = candidatesSchema.parse(data)
        store.candidates = parsedData
        //console.log(data)
      }
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const candidateCard = computed<boolean>(() => {
    return numericDisplay.value.length === store.candidateNumberLength
  })

  watch(
    () => numericDisplay.value,
    (newValue) => {
      selectedCandidate.value = undefined
      if (newValue.length === store.candidateNumberLength) {
        selectedCandidate.value = store.candidates.find(
          (candidate) => candidate.id === +numericDisplay.value,
        )
      }
    },
  )

  return {
    numericDisplay,
    // readyToVote,
    selectedCandidate,
    candidateCard,
    addVote,
    enableVoting,
    fetchCandidates,
    fetchVotes,
    resetDisplay,
    updateDisplay,
  }
}

export default useVoting
