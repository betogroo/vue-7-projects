import { supabase } from '@/plugins/supabase'
import { Voter } from '../types/Voting'
import { useVoterStore } from '../store/useVoterStore'
const useVoters = () => {
  const store = useVoterStore()
  const fetchVoters = async () => {
    try {
      const { data, error: err } = await supabase
        .from('voters')
        .select('*')
        .returns<Voter[]>()
      if (err) throw err
      store.voters = data
      return data || null
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const fetchUsedVoters = async (election_id: string) => {
    try {
      const { data: usedVoters, error: err } = await supabase
        .from('votes')
        .select('voter_id')
        .eq('election_id', election_id)
      if (err) throw err
      const _usedVoters =
        '(' + usedVoters.map((item) => `${item.voter_id}`).join(',') + ')'

      return _usedVoters
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const fetchAvailableVoters = async (election_id: string) => {
    try {
      const usedVoters = await fetchUsedVoters(election_id)
      const { data, error: err } = await supabase
        .from('voters')
        .select('id, name, ra')
        .not('id', 'in', usedVoters)
      if (err) throw err
      store.availableVoters = data
      //console.log(data, usedVoters)
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const getVoterByRa = async (election_id: string, voter_ra: string | null) => {
    try {
      const usedVoters = await fetchUsedVoters(election_id)
      const { data, error: err } = await supabase
        .from('voters')
        .select('id, name, ra')
        .not('id', 'in', usedVoters)
        .eq('ra', voter_ra)
        .single()
      if (err) throw err
      //store.availableVoters = data
      console.log(data)
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const getRandomVoter = async () => {
    const voters = await fetchVoters()
    if (!voters) return
    const index = Math.floor(Math.random() * voters!.length)
    return voters[index].id
  }

  return {
    fetchVoters,
    fetchAvailableVoters,
    getRandomVoter,
    getVoterByRa,
    fetchUsedVoters,
  }
}

export default useVoters
