import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { supabase } from '@/plugins/supabase'
import { type Candidate, Vote } from '../types/Voting'
import { useVotingStore, useCandidateStore, useElectionStore } from '../store'

const useVoting = () => {
  const votingStore = useVotingStore()
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
      const { data, error: err } = await supabase
        .from('votes_sylvio')
        .insert(vote)
        .select('*')
        .returns<Vote[]>()
        .single()
      if (err) throw err
      if (data) {
        votingStore.setVote(vote)
        resetDisplay()
        return data
      }
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const fetchVotes = async (election_id: string) => {
    try {
      const { data, error: err } = await supabase
        .from('votes_sylvio')
        .select('*')
        .eq('election_id', election_id)
      if (err) throw err
      votingStore.votes = data
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const candidateCard = computed<boolean>(() => {
    return (
      numericDisplay.value.length === election.value.candidate_number_length
    )
  })

  watch(
    () => numericDisplay.value,
    (newValue) => {
      selectedCandidate.value = undefined
      if (newValue.length === election.value.candidate_number_length) {
        selectedCandidate.value = candidateStore.candidates.find(
          (candidate) => candidate.candidate_number === numericDisplay.value,
        )
      }
    },
  )

  return {
    numericDisplay,
    selectedCandidate,
    candidateCard,
    addVote,
    // fetchCandidates,
    fetchVotes,
    resetDisplay,
    updateDisplay,
  }
}

export default useVoting
