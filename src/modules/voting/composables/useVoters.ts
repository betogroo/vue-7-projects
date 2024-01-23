import { supabase } from '@/plugins/supabase'
import { Voter } from '../types/Voting'
const useVoters = () => {
  const fetchVoters = async () => {
    try {
      const { data, error: err } = await supabase
        .from('voters')
        .select('*')
        .returns<Voter[]>()
      if (err) throw err
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  return { fetchVoters }
}

export default useVoters
