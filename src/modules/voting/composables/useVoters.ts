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

  const getRandomVoter = async () => {
    const voters = await fetchVoters()
    if (!voters) return
    const index = Math.floor(Math.random() * voters!.length)
    return voters[index].id
  }

  return { fetchVoters, getRandomVoter }
}

export default useVoters
