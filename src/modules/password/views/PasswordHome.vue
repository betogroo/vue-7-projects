<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppSwitch, AppSlider } from '../components'
import { reactive } from 'vue'

interface SecurityLevel {
  color: 'red' | 'yellow' | 'green'
  message: 'fraca' | 'razoável' | 'forte'
}

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

const securityLevel = computed<SecurityLevel>(() => {
  const countTrue = [
    formData.includeUppercase,
    formData.includeNumber,
    formData.includeSpecialCharacters,
    formData.length >= 12,
  ].filter(Boolean).length

  if (countTrue === 2 || countTrue === 3)
    return { color: 'yellow', message: 'razoável' }
  if (countTrue === 4) return { color: 'green', message: 'forte' }
  return { color: 'red', message: 'fraca' }
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
              :color="securityLevel.color"
              title="Incluir Letra Maiúscula"
              @toggle-switch="toggleUppercase()"
            />
            <AppSwitch
              v-model="formData.includeNumber"
              :color="securityLevel.color"
              title="Incluir Número"
              @toggle-switch="toggleNumber()"
            />
            <AppSwitch
              v-model="formData.includeSpecialCharacters"
              :color="securityLevel.color"
              title="Incluir Caracteres Especiais"
              @toggle-switch="toggleSpecialCharacters()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><v-btn
              block
              :color="securityLevel.color"
              type="submit"
              >{{ `Gerar Senha ${securityLevel.message}` }}</v-btn
            ></v-col
          >
        </v-row>
      </v-form>
    </v-card>

    {{ formData.includeUppercase }}, {{ formData.includeNumber }},
    {{ formData.includeSpecialCharacters }}
  </v-container>
</template>
