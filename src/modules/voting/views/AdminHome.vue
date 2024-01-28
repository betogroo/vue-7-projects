<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useElection } from '../composables'
import { useElectionStore } from '../store/useElectionStore'
import type { Election } from '../types/Voting'
const electionStore = useElectionStore()
const { elections } = storeToRefs(electionStore)
const { addElection } = useElection()
const router = useRouter()

const formData = ref<Election>({
  name: '',
  date: '',
  organization: '',
  description: '',
  candidate_number_length: 3,
})

const handleSubmit = async () => {
  try {
    const election_id = await addElection(formData.value)

    router.push({ name: 'ElectionHome', params: { id: election_id } })
  } catch (err) {
    const e = err as Error
    console.log(e)
  }
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
      <v-btn
        icon="mdi-eye"
        :to="{ name: 'ElectionHome', params: { id: item.id } }"
        variant="text"
      ></v-btn>
    </template>
  </v-data-table>
  <v-card
    variant="flat"
    width="400"
  >
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="formData.date"
        density="compact"
        type="date"
        variant="outlined"
      />
      <v-text-field
        v-model="formData.name"
        density="compact"
        variant="outlined"
      />
      <v-text-field
        v-model="formData.description"
        density="compact"
        variant="outlined"
      />
      <v-text-field
        v-model="formData.organization"
        density="compact"
        variant="outlined"
      />
      <v-btn type="submit">Cadastrar</v-btn>
    </v-form>
  </v-card>
</template>
