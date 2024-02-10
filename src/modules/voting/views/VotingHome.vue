<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Election } from '../types/Voting'
import { useElection } from '../composables'
import { ElectionForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
import { ref } from 'vue'
const electionStore = useElectionStore()
const { elections } = storeToRefs(electionStore)
const { addElection, fetchElections, deleteElection } = useElection()

const dialogDelete = ref(false)
const deleteId = ref(-1)

const dialog = ref(false)
const close = () => {
  dialog.value = false
}

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

const closeDelete = () => {
  deleteId.value = -1
  dialogDelete.value = false
}

const deleteItemConfirm = async () => {
  try {
    await deleteElection(deleteId.value)
    await fetchElections()
    closeDelete()
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
  console.log(deleteId.value)
  closeDelete()
}

const handleDelete = (id: number) => {
  deleteId.value = -1
  dialogDelete.value = true
  deleteId.value = id
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
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2"
              color="primary"
              v-bind="props"
            >
              Cadastrar Eleição
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Cadastrar Eleição</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <ElectionForm @handle-submit="(data) => handleElection(data)" />
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5"
              >Tem certeza que deseja excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >Sim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  </v-card>
</template>
