<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppSwitch, AppSlider } from '../components'

interface SecurityLevel {
  color: 'error' | 'warning' | 'success'
  message: 'fraca' | 'razoável' | 'forte'
  strong?: boolean
}

//reactive

const passwordLength = ref(6)
const includeUppercase = ref(false)
const includeNumber = ref(false)
const includeSpecialCharacters = ref(false)

const showHelp = ref(false)
const password = ref<string>('')

//methods

const resetPassword = () => {
  password.value = ''
}
const toggleUppercase = () => {
  resetPassword()
  includeUppercase.value = !includeUppercase.value
}
const toggleNumber = () => {
  resetPassword()
  includeNumber.value = !includeNumber.value
}
const toggleSpecialCharacters = () => {
  resetPassword()
  includeSpecialCharacters.value = !includeSpecialCharacters.value
}
const generatePassword = () => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const specialChars = '!@#$%^&*()-_+=[]{}|;:,.<>?/~'

  let validChars = lowercaseChars
  if (includeUppercase.value) validChars += uppercaseChars
  if (includeNumber.value) validChars += numbers
  if (includeSpecialCharacters.value) validChars += specialChars
  let generatedPassword = ''
  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length)
    generatedPassword += validChars.charAt(randomIndex)
  }
  password.value = generatedPassword
}

const contentCopy = () => {
  console.log(password.value)
}

const securityLevel = computed<SecurityLevel>(() => {
  const countTrue = [
    includeUppercase.value,
    includeNumber.value,
    includeSpecialCharacters.value,
    passwordLength.value >= 12,
  ].filter(Boolean).length

  console.log(countTrue)

  if (countTrue === 2 || countTrue === 3)
    return { color: 'warning', message: 'razoável' }
  if (countTrue === 4)
    return { color: 'success', message: 'forte', strong: true }
  return { color: 'error', message: 'fraca' }
})
</script>
<template>
  <v-container class="d-flex flex-column justify-center">
    <div class="d-flex justify-space-around align-center">
      <h1 class="text-center">Password Generator</h1>
      <v-tooltip
        v-model="showHelp"
        :content-class="`bg-${securityLevel.color}`"
        :open-on-click="true"
        width="100%"
      >
        <template #activator="{ props }">
          <v-btn
            :color="securityLevel.color"
            density="compact"
            icon
            variant="text"
            v-bind="props"
          >
            <v-icon>mdi-help-circle-outline</v-icon></v-btn
          >
        </template>
        <template #default>
          <div
            v-if="!securityLevel.strong"
            class="text-justify"
          >
            Para uma senha forte, escolha no mínimo 12 caracteres, e também
            inclua letras maiúsculas, números e caracteres especiais
          </div>
          <div
            v-else
            class="text-justify text-h5"
          >
            Senha Forte
          </div>
        </template>
      </v-tooltip>
    </div>

    <v-card
      class="pa-4"
      variant="outlined"
    >
      <v-form @submit.prevent="generatePassword">
        <v-row align="center">
          <v-col>
            <AppSlider v-model="passwordLength" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <AppSwitch
              v-model="includeUppercase"
              :color="securityLevel.color"
              title="Incluir Letra Maiúscula"
              @toggle-switch="toggleUppercase()"
            />
            <AppSwitch
              v-model="includeNumber"
              :color="securityLevel.color"
              title="Incluir Número"
              @toggle-switch="toggleNumber()"
            />
            <AppSwitch
              v-model="includeSpecialCharacters"
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
      <v-row v-if="password.length">
        <v-col>
          <v-card
            class="d-flex justify-space-around align-center"
            variant="text"
          >
            <v-card-text :class="passwordLength < 25 ? 'text-h5' : ''">{{
              password
            }}</v-card-text>
            <v-icon @click="contentCopy">mdi-content-copy</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
