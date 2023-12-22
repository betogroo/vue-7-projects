<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppSwitch, AppSlider } from '../components'

//reactive
const length = ref<number>(6)
const includeUppercase = ref<boolean>(false)
const includeNumber = ref<boolean>(false)
const includeSpecialCharacters = ref<boolean>(false)

//methods
const toggleUppercase = () => {
  includeUppercase.value = !includeUppercase.value
}
const toggleNumber = () => {
  includeNumber.value = !includeNumber.value
}
const toggleSpecialCharacters = () => {
  includeSpecialCharacters.value = !includeSpecialCharacters.value
}
const handleSubmit = () => {
  console.log(includeUppercase.value)
}

const securityColor = computed(() => {
  const countTrue = [
    includeUppercase.value,
    includeNumber.value,
    includeSpecialCharacters.value,
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
    <h1>Password Generator</h1>
    <v-form @submit.prevent="handleSubmit">
      <v-row align="center">
        <v-col>
          <AppSlider v-model="length" />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <AppSwitch
            v-model="includeUppercase"
            :color="securityColor"
            title="Incluir Letra Maiúscula"
            @toggle-switch="toggleUppercase()"
          />
          <AppSwitch
            :color="securityColor"
            title="Incluir Número"
            @toggle-switch="toggleNumber()"
          />
          <AppSwitch
            :color="securityColor"
            title="Incluir Caracteres Especiais"
            @toggle-switch="toggleSpecialCharacters()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col><v-btn type="submit">Enviar</v-btn></v-col>
      </v-row>
    </v-form>

    {{ includeUppercase }}, {{ includeNumber }}, {{ includeSpecialCharacters }}
  </v-container>
</template>
