<script setup lang="ts">
import { NumericDisplay } from '.'
import { useVotingStore } from '../store/useVotingStore'
interface Props {
  visible: boolean
}
withDefaults(defineProps<Props>(), {
  visible: false,
})

const store = useVotingStore()

const displayValue = defineModel<string>()
</script>

<template>
  <v-card
    class="mt-2 mr-1 rounded-xl"
    :hover="false"
    variant="text"
  >
    <v-card-title class="text-center text-uppercase"
      >Digite o Grêmio que deseja votar</v-card-title
    >
    <v-card-text class="text-uppercase text-h6 text-start">
      <v-row align="center">
        <v-col>
          <NumericDisplay
            :content="displayValue"
            label="Número"
            :length="store.candidateNumberLength"
          />
        </v-col>
      </v-row>
      <v-row
        align="center"
        :style="{ visibility: visible ? 'visible' : 'hidden' }"
      >
        <v-col cols="4"><h4>Nome:</h4></v-col>
        <v-col>
          <span>Nome do Grêmio escolhido</span>
        </v-col>
      </v-row>
      <v-divider
        class="my-8"
        thickness="4"
      ></v-divider>
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="12">
          <span>Aperte a Tecla: </span>
        </v-col>
        <div>
          <v-col cols="12"><span>Confirma para confirmar seu voto</span></v-col>
          <v-col><span>Corrige para reiniciar seu voto</span></v-col>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>
