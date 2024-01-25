import { supabase } from '@/plugins/supabase'
import { useElectionStore } from '../store/useElectionStore'
import type { Election } from '../types/Voting'
const useElection = () => {
  const store = useElectionStore()
  const getElection = async (id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('election')
        .select('*')
        .eq('id', id)
        .returns<Election>()
        .single()
      if (err) throw err
      store.election = data
      return data || null
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const addElection = async (values: Election) => {
    try {
      const { data, error: err } = await supabase
        .from('election')
        .insert(values)
        .select()
      if (err) throw err
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const setReady = async (id: number, value: boolean) => {
    try {
      const { data, error: err } = await supabase
        .from('election')
        .update({ ready: value })
        .eq('id', id)
      if (err) throw err
      console.log(data)
      console.log(value)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  supabase
    .channel('election')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: '*',
        table: 'election',
      },
      (event) => {
        if (store.election && event.old.id === store.election.id) {
          console.log(event)
          console.log('Vai mudar a tabela')
          const { new: newConfig } = event
          store.election = newConfig as Election
        }
      },
    )
    .subscribe()

  return { getElection, addElection, setReady }
}

export default useElection
