<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Election } from '../types/Voting'
import { useElection } from '../composables'
import { ElectionForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
const electionStore = useElectionStore()
const { elections } = storeToRefs(electionStore)
const { addElection, fetchElections } = useElection()

const handleElection = async (data: Election) => {
  try {
    const [election, elections] = await Promise.all([
      addElection(data),
      fetchElections(),
    ])
    console.log(election), elections
  } catch (err) {
    const e = err as Error
    console.error(e)
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
    v-if="elections.length"
    density="compact"
    :headers="headers"
    :items="elections"
  >
    <template #top>
      <v-toolbar density="compact">
        <v-toolbar-title>Eleições Cadastradas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-plus">Nova Eleição</v-btn>
      </v-toolbar>
    </template>

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
  <div v-else>Nada</div>
  <v-card
    variant="flat"
    width="400"
  >
    <ElectionForm @handle-submit="(data) => handleElection(data)" />
  </v-card>
</template>
