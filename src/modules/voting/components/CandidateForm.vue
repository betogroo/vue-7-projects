<script setup lang="ts">
import { ref } from 'vue'
import { Candidate } from '../types/Voting'

interface Props {
  candidate_number_length: number
  election_id: string
}
const props = defineProps<Props>()

const $emit = defineEmits<{
  'add-candidate': [value: Candidate]
}>()

const formData = ref<Candidate>({
  avatar: 'https://picsum.photos/200',
  election_id: props.election_id,
  name: '',
  candidate_number: '',
})

const handleSubmit = () => {
  $emit('add-candidate', formData.value)
}

const nameRef = ref()
const testIfNumberIsAvailable = () => {
  console.log('Testar se número está disponível')
  nameRef.value.focus()
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row
      align="center"
      no-gutters
    >
      <v-col cols="6">Número do Candidato</v-col>
      <v-col>
        <v-otp-input
          v-model="formData.candidate_number"
          label="Número do Candidato"
          :length="candidate_number_length"
          width="200"
          @finish="testIfNumberIsAvailable"
        ></v-otp-input>
      </v-col>
      <v-col cols="12">
        <v-text-field
          ref="nameRef"
          v-model="formData.name"
          label="Nome do Candidato"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn
          block
          color="primary"
          type="submit"
          variant="elevated"
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
