<script setup lang="ts">
import { ref } from 'vue'
import { Election } from '../types/Voting'

const $emit = defineEmits<{
  'handle-submit': [value: Election]
}>()

const formData = ref<Election>({
  name: 'Nome da Eleição',
  date: '2024-03-22',
  organization: 'Escola do Sylvio Tor 4',
  description: 'Descrição sucinta do objeto da eleição',
  candidate_number_length: 3,
  uppercase: false,
})

const handleSubmit = () => {
  $emit('handle-submit', formData.value)
}
</script>

<template>
  <v-form
    class="pa-1 ma-1"
    @submit.prevent="handleSubmit"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="formData.date"
          density="compact"
          label="Data da Eleição"
          type="date"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.name"
          density="compact"
          label="Titulo da Eleição"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.description"
          density="compact"
          label="Descrição"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.organization"
          density="compact"
          label="Nome da Instituição"
          variant="outlined"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="formData.candidate_number_length"
          clearable
          density="compact"
          :items="[1, 2, 3, 4, 5]"
          label="Dígitos"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col cols="8">
        <v-switch
          v-model="formData.uppercase"
          class="d-flex justify-center align-center"
          color="success"
          density="compact"
          hide-details
          label="Letras em Caixa Alta?"
        ></v-switch>
      </v-col>
    </v-row>

    <v-btn type="submit">Cadastrar</v-btn>
  </v-form>
</template>
