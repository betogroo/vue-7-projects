import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema } from '../types/Voting'
import { useVotingStore } from '../store/useVotingStore'
import { useVoterStore } from '../store/useVotersStore'
import { computed, ref, watch } from 'vue'

const useVoting = () => {
  const store = useVotingStore()
  const voterStore = useVoterStore()

  const numericDisplay = ref('')
  const selectedCandidate = ref<Candidate | undefined>(undefined)

  const resetDisplay = () => {
    numericDisplay.value = ''
    selectedCandidate.value = undefined
  }

  const updateDisplay = (value: number | string) => {
    numericDisplay.value += value
  }

  const addVote = async (candidate_id: number, election_id: number) => {
    const voter_id = voterStore.randomVoter()
    console.log(voter_id)
    try {
      const { error: err } = await supabase
        .from('votes')
        .insert({ candidate_id, election_id, voter_id })

      if (err) throw Error('Não foi possível votar')
      resetDisplay()
      store.setVote(candidate_id, election_id)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const fetchVotes = async (election_id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('votes')
        .select('*')
        .eq('election_id', election_id)
      if (err) throw err
      store.votes = data
      return data
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
        return data || null
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
    selectedCandidate,
    candidateCard,
    addVote,
    fetchCandidates,
    fetchVotes,
    resetDisplay,
    updateDisplay,
  }
}

export default useVoting
