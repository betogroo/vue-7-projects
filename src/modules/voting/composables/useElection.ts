import { supabase } from '@/plugins/supabase'
import { useElectionStore } from '../store/useElectionStore'
import { useHelpers } from '@/shared/composables'
import type { Election } from '../types/Voting'

const { dateBr } = useHelpers()
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
      elections.map((item) => (item.date = dateBr(item.date)))
      console.log('passou aqui')
      store.elections = elections
      return elections
    } catch (err) {
      const e = err as Error
      console.error(e.message)
    }
  }

  const getElection = async (id: string) => {
    try {
      const { data: election, error: err } = await supabase
        .from('election')
        .select('*')
        .eq('id', id)
        .returns<Election[]>()
        .single()
      if (err)
        throw new Error(
          `Erro ao buscar a eleição: ${err.message} (${err.code})`,
        )
      if (!election) throw new Error('Erro ao carregar a eleição!')
      store.election = election
      return election
    } catch (err) {
      const e = err as Error
      console.error(e)
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

  const setReady = async (id: string, value: boolean) => {
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
      console.error(e)
    }
  }

  const deleteElection = async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('election')
        .delete()
        .eq('id', id)
      if (err)
        throw new Error(
          `Erro ao tentar excluir a eleição: ${err.message} (${err.code})`,
        )
    } catch (err) {
      const e = err as Error
      console.error(e)
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

  return { fetchElections, getElection, addElection, setReady, deleteElection }
}

export default useElection
