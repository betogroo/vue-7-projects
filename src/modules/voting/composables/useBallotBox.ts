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
        .returns<BallotBox[]>()
        .single()
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

  const setBallotBoxReady = async (id: string, ready: string | null) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .update({
          ready,
        })
        .eq('id', id)
      if (err) throw err
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  supabase
    .channel('ballot_box_ready_change')
    .on(
      'postgres_changes',

      {
        event: 'UPDATE',
        schema: 'public',
        table: 'ballot_box',
      },
      (event) => {
        if (
          ballotBoxStore.ballotBox &&
          event.old.id === ballotBoxStore.ballotBox.id
        ) {
          console.log(event)
          console.log('Vai mudar a tabela')
          const { new: newBallotBox } = event
          ballotBoxStore.ballotBox = newBallotBox as BallotBox
        }
        if (ballotBoxStore.ballotsBox) {
          console.log(event)
          const { old, new: newBallotBox } = event
          const index = ballotBoxStore.ballotsBox.findIndex(
            (item) => item.id === old.id,
          )
          ballotBoxStore.ballotsBox[index] = newBallotBox as BallotBox
          console.log(newBallotBox.id, index)
        }
      },
    )
    .subscribe()
  return { fetchBallotBox, addBallotBox, getBallotBox, setBallotBoxReady }
}

export default useBallotBox
