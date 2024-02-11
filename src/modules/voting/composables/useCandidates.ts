import { supabase } from '@/plugins/supabase'
import { type Candidate, candidatesSchema } from '../types/Voting'
import { useCandidateStore } from '../store/useCandidateStore'
const table = 'candidates'

const useCandidates = () => {
  const store = useCandidateStore()
  const fetchCandidates = async (election_id: string) => {
    try {
      const { data: candidates, error: err } = await supabase
        .from(table)
        .select('*')
        .order('name')
        .eq('election_id', election_id)
        .returns<Candidate[]>()
      if (err)
        throw new Error(
          `Erro ao buscar os Candidatos: ${err.message} (${err.code})`,
        )
      if (!candidates) throw new Error('Nenhum candidato cadastrado!')
      store.candidates = candidatesSchema.parse(candidates)
      return candidates
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const addCandidate = async (candidate: Candidate) => {
    try {
      const { data, error: err } = await supabase
        .from(table)
        .insert(candidate)
        .select()
        .returns<Candidate>()
      if (err) throw err
      console.log(data)
      return data.id
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  return { fetchCandidates, addCandidate }
}

export default useCandidates
