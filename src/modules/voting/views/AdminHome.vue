<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useElectionStore } from '../store/useElectionStore'
const electionStore = useElectionStore()
const { elections } = storeToRefs(electionStore)

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
      <v-btn
        icon="mdi-eye"
        :to="{ name: 'ElectionHome', params: { id: item.id } }"
        variant="text"
      ></v-btn>
    </template>
  </v-data-table>
</template>
