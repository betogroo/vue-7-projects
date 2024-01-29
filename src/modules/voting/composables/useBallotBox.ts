import { supabase } from '@/plugins/supabase'
import { BallotBox } from '../types/Voting'
import { useBallotBoxStore } from '../store/useBallotBoxStore'

const useBallotBox = () => {
  const ballotBoxStore = useBallotBoxStore()
  const fetchBallotBox = async (election_id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('election_id', election_id)
        .returns<BallotBox[]>()
      if (err) throw err
      ballotBoxStore.ballotsBox = data
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const addBallotBox = async (election_id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .insert({ election_id })
      if (err) throw err
      await fetchBallotBox(election_id)
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  return { fetchBallotBox, addBallotBox }
}

export default useBallotBox
