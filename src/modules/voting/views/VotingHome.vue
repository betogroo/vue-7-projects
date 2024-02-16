<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { Election, TableHeader } from '../types/Voting'
import { useElection } from '../composables'
import { ElectionForm, AppGenericTable as ElectionTable } from '../components'

const {
  isPending,
  elections,
  error,
  addElection,
  fetchElections,
  deleteElection,
} = useElection()

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
  <v-container>
    <template v-if="isPending">
      <v-skeleton-loader type="table"></v-skeleton-loader>
    </template>
    <template v-else>
      <template v-if="error">
        <v-alert type="error">{{ error.error?.message }}</v-alert>
      </template>
      <template v-else>
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
      </template>
    </template>
  </v-container>
</template>
