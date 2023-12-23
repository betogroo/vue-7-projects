<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppSwitch, AppSlider } from '../components'
import { reactive } from 'vue'

//reactive

const formData = reactive({
  length: 6,
  includeUppercase: false,
  includeNumber: false,
  includeSpecialCharacters: false,
})

//methods
const toggleUppercase = () => {
  formData.includeUppercase = !formData.includeUppercase
}
const toggleNumber = () => {
  formData.includeNumber = !formData.includeNumber
}
const toggleSpecialCharacters = () => {
  formData.includeSpecialCharacters = !formData.includeSpecialCharacters
}
const handleSubmit = () => {
  console.log(formData)
}

const securityColor = computed(() => {
  const countTrue = [
    formData.includeUppercase,
    formData.includeNumber,
    formData.includeSpecialCharacters,
  ].filter(Boolean).length
  let color

  switch (countTrue) {
    case 0:
    case 1:
      color = 'red'
      break
    case 2:
      color = 'yellow'
      break
    case 3:
      color = 'green'
  }
  return color
})
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 class="text-center">Password Generator</h1>
    <v-card
      class="pa-4"
      variant="outlined"
    >
      <v-form @submit.prevent="handleSubmit">
        <v-row align="center">
          <v-col>
            <AppSlider v-model="formData.length" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <AppSwitch
              v-model="formData.includeUppercase"
              :color="securityColor"
              title="Incluir Letra Maiúscula"
              @toggle-switch="toggleUppercase()"
            />
            <AppSwitch
              v-model="formData.includeNumber"
              :color="securityColor"
              title="Incluir Número"
              @toggle-switch="toggleNumber()"
            />
            <AppSwitch
              v-model="formData.includeSpecialCharacters"
              :color="securityColor"
              title="Incluir Caracteres Especiais"
              @toggle-switch="toggleSpecialCharacters()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><v-btn
              block
              :color="securityColor"
              type="submit"
              >Gerar Senha</v-btn
            ></v-col
          >
        </v-row>
      </v-form>
    </v-card>

    {{ formData.includeUppercase }}, {{ formData.includeNumber }},
    {{ formData.includeSpecialCharacters }}
  </v-container>
</template>
