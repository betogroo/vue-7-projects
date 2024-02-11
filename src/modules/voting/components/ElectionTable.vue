<script setup lang="ts">
import { ref } from 'vue'
import { Election } from '../types/Voting'

interface Props {
  elections: Election[]
}
defineProps<Props>()
const $emit = defineEmits<{
  'delete-item-confirm': [election_id: string]
  'handle-election': [election: Election]
}>()
const dialogDelete = ref(false)
const deleteId = ref<string>('')
const dialog = defineModel<boolean>()
const close = () => {
  dialog.value = false
}

const handleDelete = (id: string) => {
  deleteId.value = ''
  dialogDelete.value = true
  deleteId.value = id
}

/* const handleElection = (election: Election) => {
  $emit('handle-election', election)
  dialog.value = false
} */

const closeDelete = () => {
  deleteId.value = ''
  dialogDelete.value = false
}

const deleteItemConfirm = (election_id: string) => {
  $emit('delete-item-confirm', election_id)
  closeDelete()
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
  <v-data-table
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
                <slot />
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
                @click="deleteItemConfirm(deleteId)"
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
</template>
