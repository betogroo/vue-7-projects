<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { BtnNumber, TextContainer } from '../components'
import type { BtnAction } from '../types/Voting'

const display = ref('')
const resetDisplay = () => {
  display.value = ''
}

const confirmVote = () => {
  console.log(display.value)
}

const btn = [9, 8, 7, 6, 5, 4, 3, 2, 1]

const displayConfig = ref({
  uppercaseText: true,
})

const updateDisplay = (value: number | string) => {
  if (display.value === '0') display.value = ''
  display.value += value
}

const suitorCard = computed<boolean>(() => display.value.length === 3)
const btnActions: BtnAction[] = [
  {
    color: 'white',
    text: 'Corrige',
    value: 'clear',
    action: resetDisplay,
    disabled: suitorCard.value,
  },
  {
    color: 'success',
    text: 'Confirma',
    value: 'confirm',
    action: confirmVote,
    disabled: !suitorCard.value,
  },
]
</script>
<template>
  <v-container
    class="d-flex justify-center align-start fill-height"
    fluid
  >
    <v-row no-gutters>
      <v-col cols="12">
        <v-card
          class="head"
          variant="outlined"
        >
          Nome da Instituição
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card
          class="display d-flex flex-column justify-space-between h-100"
          variant="outlined"
        >
          <TextContainer text="Digite o grêmio que deseja votar" />
          <div>
            <div class="d-flex align-center">
              <TextContainer text="Número: " />
              <v-otp-input
                v-model="display"
                height="80"
                length="3"
                width="240"
              >
              </v-otp-input>
            </div>
            <TextContainer
              v-if="suitorCard"
              align="left"
              class="mt-8"
              text="NOME: AQUI APARECE O NOME DO GRÊMIO"
            />
          </div>

          <div>
            <v-divider></v-divider>
            <TextContainer
              align="left"
              text="Aperte a tecla:"
            />
            <TextContainer
              align="left"
              class="ml-4"
              text="CONFIRMA para CONFIRMAR este voto"
            />
            <TextContainer
              align="left"
              class="ml-4"
              text="CORRIGE para REINICIAR este voto"
            />
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="keyboard"
          height="500"
          variant="outlined"
        >
          <v-row
            v-for="row in 3"
            :key="row"
            no-gutters
          >
            <v-col
              v-for="col in 3"
              :key="col"
              class="text-center"
              :order="col === 1 ? 'last' : col === 3 ? 'first' : ''"
            >
              <BtnNumber
                :disabled="suitorCard"
                :value="btn[(row - 1) * 3 + col - 1]"
                @handle-click="updateDisplay"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="text-center"
              ><BtnNumber
                :disabled="suitorCard"
                :value="0"
                @handle-click="updateDisplay"
            /></v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-space-around text-center">
              <v-btn
                color="white"
                @click="resetDisplay"
                >Corrige</v-btn
              >
              <v-btn
                color="success"
                :disabled="!suitorCard"
                @click="confirmVote"
                >Confirmar</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
