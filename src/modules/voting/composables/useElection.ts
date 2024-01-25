import { supabase } from '@/plugins/supabase'
import type { Election } from '../types/Voting'
const useElection = () => {
  const getElection = async (id: number) => {
    try {
      const { data, error: err } = await supabase
        .from('election')
        .select('*')
        .eq('id', id)
        .returns<Election>()
        .single()
      if (err) throw err
      if (data) console.log(data)
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
  return { getElection, addElection }
}

export default useElection
