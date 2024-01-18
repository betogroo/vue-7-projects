import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema } from '../types/Voting'
import { useVotingStore } from '../store/useVotingStore'
const useVoting = () => {
  const store = useVotingStore()
  const addVote = async (candidate_id: number) => {
    try {
      const { error: err } = await supabase
        .from('votes')
        .insert({ candidate_id })

      if (err) throw Error('Não foi possível votar')
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
  return { addVote, fetchCandidates, fetchVotes }
}

export default useVoting
