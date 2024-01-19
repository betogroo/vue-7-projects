import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema } from '../types/Voting'
import { useVotingStore } from '../store/useVotingStore'
import { computed, ref, watch } from 'vue'
const useVoting = () => {
  const store = useVotingStore()

  const numericDisplay = ref('')
  const selectedCandidate = ref<Candidate | undefined>(undefined)
  const readyToVote = ref(true)

  const resetDisplay = () => {
    numericDisplay.value = ''
    selectedCandidate.value = undefined
  }

  const updateDisplay = (value: number | string) => {
    numericDisplay.value += value
  }

  const enableVoting = () => {
    resetDisplay()
    readyToVote.value = true
  }

  const addVote = async (candidate_id: number) => {
    try {
      const { error: err } = await supabase
        .from('votes')
        .insert({ candidate_id })

      if (err) throw Error('Não foi possível votar')
      store.setVote(candidate_id)
      readyToVote.value = false
      resetDisplay()
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

  /* const channel = supabase
    .channel('my_channel_for_candidates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: '*',
        table: 'candidates',
      },
      (event) => {
        console.log(event)
        const { new: newCandidate } = event
        store.candidates = store.candidates.map((candidate) => {
          if (candidate.id === newCandidate.id) {
            return { ...candidate, ...newCandidate }
          }
          return candidate
        })
      },
    )
    .subscribe() */

  return {
    numericDisplay,
    readyToVote,
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
