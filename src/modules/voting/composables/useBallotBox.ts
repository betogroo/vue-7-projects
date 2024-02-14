import { supabase } from '@/plugins/supabase'
import { BallotBox } from '../types/Voting'
import { useBallotBoxStore } from '../store/useBallotBoxStore'

const useBallotBox = () => {
  const ballotBoxStore = useBallotBoxStore()
  const fetchBallotBox = async (election_id: string) => {
    try {
      const { data: ballotsBox, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('election_id', election_id)
        .returns<BallotBox[]>()
      if (err || !ballotsBox)
        throw new Error(`Erro ao buscar as urna: ${err.message} (${err.code})`)
      ballotBoxStore.ballotsBox = ballotsBox
      return ballotsBox
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const getBallotBox = async (id: string) => {
    try {
      const { data: ballotBox, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('id', id)
        .returns<BallotBox[]>()
        .single()
      if (err || !ballotBox)
        throw new Error(`Erro ao buscar as urna: ${err.message} (${err.code})`)
      ballotBoxStore.ballotBox = ballotBox
      return ballotBox
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const addBallotBox = async (election_id: string, site: string) => {
    try {
      if (!election_id) throw new Error('Erro ao tentar criar a urna:')
      const { data: ballotBox, error: err } = await supabase
        .from('ballot_box')
        .insert({ election_id, site })
        .select('*')
        .returns<BallotBox>()
      if (err || !ballotBox)
        throw new Error(
          `Erro ao tentar criar a urna: ${err.message} (${err.code})`,
        )
      console.log(ballotBox)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const setBallotBoxReady = async (id: string, ready: string | null) => {
    try {
      const { error: err } = await supabase
        .from('ballot_box')
        .update({
          ready,
        })
        .eq('id', id)
      if (err) throw err
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
        }
      },
    )
    .subscribe()
  return { fetchBallotBox, addBallotBox, getBallotBox, setBallotBoxReady }
}

export default useBallotBox
