<script setup lang="ts">
import { ref } from 'vue'
import { AppSwitch, AppSlider, AppTooltip } from '../components'
import usePassword from '../composables/usePassword'
import { useClipboard } from '@vueuse/core'

//composable
const {
  password,
  passwordLength,
  includeNumber,
  includeSpecialCharacters,
  includeUppercase,
  securityLevel,
  toggleNumber,
  toggleSpecialCharacters,
  toggleUppercase,
  generatePassword,
} = usePassword()

const { copy, copied } = useClipboard({ copiedDuring: 2000 })

//reactive
const isHelpVisible = ref(false)

//methods
const copyPassword = async () => {
  await copy(password.value)
}
</script>
<template>
  <v-container class="d-flex flex-column justify-start">
    <div class="d-flex justify-space-around align-center mb-3">
      <h1 class="text-center text-h5">Password Generator</h1>
      <AppTooltip
        v-model="isHelpVisible"
        :color="securityLevel.color"
      >
        <div
          v-if="!securityLevel.strong"
          class="text-justify"
        >
          Para uma senha forte, escolha no mínimo 12 caracteres, e também inclua
          letras maiúsculas, números e caracteres especiais
        </div>
        <div
          v-else
          class="text-justify text-h5"
        >
          Senha Forte
        </div>
      </AppTooltip>
    </div>

    <v-card variant="text">
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
            variant="outlined"
          >
            <v-card-text
              v-if="!copied"
              :class="passwordLength < 25 ? 'text-h5' : ''"
              >{{ password }}</v-card-text
            >
            <v-card-text
              v-else
              class="passwordContainer"
              >Copiado para a área de transferência</v-card-text
            >
            <v-icon
              class="mr-2"
              :icon="!copied ? 'mdi-content-copy' : 'mdi-check'"
              @click="copyPassword"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.passwordContainer {
  font-size: 1rem;
}
</style>
