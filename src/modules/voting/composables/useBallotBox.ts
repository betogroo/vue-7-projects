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

  const getBallotBox = async (id: string) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('id', id)
        .returns<BallotBox>()
      if (err) throw err
      ballotBoxStore.ballotBox = data
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const addBallotBox = async (election_id: number, site: string) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .insert({ election_id, site })
      if (err) throw err
      await fetchBallotBox(election_id)
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  return { fetchBallotBox, addBallotBox, getBallotBox }
}

export default useBallotBox
