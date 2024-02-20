<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
// import { storeToRefs } from 'pinia'
import type { ElectionInsert, TableHeader } from '../types/Voting'
import { useElection } from '../composables'
import { ElectionForm, AppGenericTable as ElectionTable } from '../components'
import { useElectionStore } from '../store/useElectionStore'

const { addElection, fetchElections, deleteElection, elections } = useElection()
const electionStore = useElectionStore()

// const { elections } = storeToRefs(electionStore)

const dialog = ref(false)

const handleElection = async (data: ElectionInsert) => {
  try {
    await addElection(data)
    await fetchElections()
    dialog.value = false
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
}

const deleteItemConfirm = async (election_id: string) => {
  try {
    await deleteElection(election_id)
    await fetchElections()
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
}

const electionTableHeader: TableHeader[] = [
  {
    title: 'Data',
    key: 'date',
  },
  {
    title: 'Nome',
    key: 'name',
  },
  {
    title: 'Organização',
    key: 'organization',
  },
  {
    title: 'Descrição',
    key: 'description',
  },
  {
    title: 'Ações',
    key: 'actions',
  },
]

onBeforeMount(async () => {
  await fetchElections()
})
</script>

<template>
  <h1>Administração e Contabilização</h1>
  <h2>Total de Eleições cadastradas: {{ electionStore.totalElections }}</h2>

  <ElectionTable
    v-model="dialog"
    :aim-view="'ElectionHome'"
    :headers="electionTableHeader"
    :table-data="elections"
    table-subject="Eleição"
    title="Eleições Cadastradas"
    @delete-item-confirm="(id) => deleteItemConfirm(id)"
  >
    <template #addForm>
      <ElectionForm @handle-submit="(data) => handleElection(data)" />
    </template>
  </ElectionTable>
  <v-card
    variant="flat"
    width="400"
  >
  </v-card>
</template>
