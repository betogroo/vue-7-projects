import { supabase } from '@/plugins/supabase'
import { useConfigStore } from '../store/useConfigStore'
import type { Config } from '../types/Voting'
const useConfig = () => {
  const store = useConfigStore()
  const fetchConfig = async () => {
    try {
      const { data, error: err } = await supabase
        .from('voting_config')
        .select('*')
        .limit(1)
        .returns<Config>()
        .single()
      if (err) throw err
      store.config = data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const setConfig = async (value: Config) => {
    try {
      const { data, error: err } = await supabase
        .from('voting_config')
        .upsert(value)
        .select()
      if (err) throw err
      console.log(data)
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const channel = supabase
    .channel('my_channel_for_config')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: '*',
        table: 'voting_config',
      },
      (event) => {
        console.log(event)
        const { new: newConfig } = event
        store.config = { ...newConfig }
      },
    )
    .subscribe()

  return { fetchConfig, setConfig, channel }
}

export default useConfig
