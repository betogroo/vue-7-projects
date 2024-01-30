import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema, Vote } from '../types/Voting'
import { useVotingStore } from '../store/useVotingStore'
import { useCandidateStore } from '../store/useCandidateStore'
import { useElectionStore } from '../store/useElectionStore'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const useVoting = () => {
  const store = useVotingStore()
  const candidateStore = useCandidateStore()
  const electionStore = useElectionStore()
  const { election } = storeToRefs(electionStore)

  const numericDisplay = ref('')
  const selectedCandidate = ref<Candidate | undefined>(undefined)

  const resetDisplay = () => {
    numericDisplay.value = ''
    selectedCandidate.value = undefined
  }

  const updateDisplay = (value: number | string) => {
    numericDisplay.value += value
  }

  const addVote = async (vote: Vote) => {
    try {
      const { error: err } = await supabase.from('votes').insert(vote)

      if (err) throw Error('Não foi possível votar')
      resetDisplay()
      store.setVote(vote)
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
    return (
      numericDisplay.value.length === election.value?.candidate_number_length
    )
  })

  watch(
    () => numericDisplay.value,
    (newValue) => {
      selectedCandidate.value = undefined
      if (newValue.length === election.value?.candidate_number_length) {
        selectedCandidate.value = candidateStore.candidates.find(
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
