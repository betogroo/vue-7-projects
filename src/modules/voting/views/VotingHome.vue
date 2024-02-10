<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Election } from '../types/Voting'
import { useElection } from '../composables'
import { ElectionTable, ElectionForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
import { ref } from 'vue'
const electionStore = useElectionStore()
const { elections } = storeToRefs(electionStore)
const { addElection, fetchElections, deleteElection } = useElection()

const dialog = ref(false)

const handleElection = async (data: Election) => {
  try {
    await addElection(data)
    await fetchElections()
    dialog.value = false
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
}

const deleteItemConfirm = async (election_id: number) => {
  try {
    await deleteElection(election_id)
    await fetchElections()
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
}
</script>

<template>
  <h1>Administração e Contabilização</h1>
  <h2>Total de Eleições cadastradas: {{ electionStore.totalElections }}</h2>
  <ElectionTable
    v-model="dialog"
    :elections="elections"
    @delete-item-confirm="(id) => deleteItemConfirm(id)"
    @handle-election="(data) => handleElection(data)"
  >
    <ElectionForm @handle-submit="(data) => handleElection(data)" />
  </ElectionTable>
  <v-card
    variant="flat"
    width="400"
  >
  </v-card>
</template>
