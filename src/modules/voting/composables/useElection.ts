import { supabase } from '@/plugins/supabase'
import { useElectionStore } from '../store/useElectionStore'
import type { Election } from '../types/Voting'
const useElection = () => {
  const store = useElectionStore()
  const fetchElections = async () => {
    try {
      const { data: elections, error: err } = await supabase
        .from('election')
        .select('*')
        .returns<Election[]>()
        .order('id')
      if (err)
        throw new Error(
          `Erro ao buscar as eleições: ${err.message} (${err.code})`,
        )
      if (!elections || !elections.length)
        throw Error('Nenhuma eleição cadastrada!')
      store.elections = elections
      return elections
    } catch (err) {
      const e = err as Error
      console.error(e.message)
    }
  }

  const getElection = async (id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('election')
        .select('*')
        .eq('id', id)
        .returns<Election[]>()
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
        .returns<Election[]>()
        .single()
      if (err) throw err
      console.log(data)
      return data.id
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
        // update election state
        if (store.election && event.old.id === store.election.id) {
          console.log(event)
          console.log('Vai mudar a tabela')
          const { new: newConfig } = event
          store.election = newConfig as Election
        }
        // update elections state
        const index = store.elections.findIndex(
          (item) => item.id === event.old.id,
        )
        if (index !== -1) {
          console.log(event, index)
          store.elections[index] = event.new as Election
        } else {
          console.log('nao achou')
        }
      },
    )
    .subscribe()

  return { fetchElections, getElection, addElection, setReady }
}

export default useElection
