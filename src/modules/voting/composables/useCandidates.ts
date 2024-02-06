import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema } from '../types/Voting'
import { useCandidateStore } from '../store/useCandidateStore'

const useCandidates = () => {
  const store = useCandidateStore()
  const fetchCandidates = async (election_id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('candidates')
        .select('*')
        .order('name')
        .eq('election_id', election_id)
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

  const addCandidate = async (candidate: Candidate) => {
    try {
      const { data, error: err } = await supabase
        .from('candidate')
        .insert(candidate)
        .select()
        .returns<Candidate>()
      if (err) throw err
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  return { fetchCandidates, addCandidate }
}

export default useCandidates
