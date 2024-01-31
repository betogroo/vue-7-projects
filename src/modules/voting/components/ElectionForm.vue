<script setup lang="ts">
import { ref } from 'vue'
import { Election } from '../types/Voting'

const $emit = defineEmits<{
  'handle-submit': [value: Election]
}>()

const formData = ref<Election>({
  name: '',
  date: '',
  organization: '',
  description: '',
  candidate_number_length: 3,
})

const handleSubmit = () => {
  $emit('handle-submit', formData.value)
}
</script>

<template>
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
</template>
