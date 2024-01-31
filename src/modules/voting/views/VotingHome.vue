<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Election } from '../types/Voting'
import { useRouter } from 'vue-router'
import { useElection } from '../composables'
import { ElectionForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
const electionStore = useElectionStore()
const { elections } = storeToRefs(electionStore)
const { addElection } = useElection()
const router = useRouter()

const handleSubmit = async (data: Election) => {
  try {
    const election_id = await addElection(data)
    router.push({ name: 'ElectionHome', params: { id: election_id } })
  } catch (err) {
    const e = err as Error
    console.log(e)
  }
}

const handleDelete = (id: number) => {
  console.log(id)
}

const headers = [
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
</script>

<template>
  <h1>Administração e Contabilização</h1>
  <h2>Total de Eleições cadastradas: {{ electionStore.totalElections }}</h2>

  <v-data-table
    :headers="headers"
    :items="elections"
  >
    <template #item.actions="{ item }">
      <div
        v-if="item.id"
        class="d-flex"
      >
        <v-btn
          icon="mdi-eye"
          :to="{ name: 'ElectionHome', params: { id: item.id } }"
          variant="text"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          variant="text"
          @click="handleDelete(item.id)"
        ></v-btn>
      </div>
    </template>
  </v-data-table>
  <v-card
    variant="flat"
    width="400"
  >
    <ElectionForm @handle-submit="(data) => handleSubmit(data)" />
  </v-card>
</template>
