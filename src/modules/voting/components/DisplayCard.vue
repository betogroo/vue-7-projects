<script setup lang="ts">
import { NumericDisplay, CandidateDisplay } from '.'
import { useVotingStore } from '../store/useVotingStore'
import type { Candidate } from '../types/Voting'
interface Props {
  visible: boolean
  candidate: Candidate | undefined
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
    <v-row>
      <v-col
        class="text-h6"
        :class="store.uppercase ? 'text-uppercase' : ''"
        cols="12"
      >
        {{ store.displayCardTitle }}
      </v-col>
    </v-row>
    <v-card-text
      class="text-h6 text-start"
      :class="store.uppercase ? 'text-uppercase' : ''"
    >
      <NumericDisplay
        :content="displayValue"
        label="Número"
        :length="store.candidateNumberLength"
      />

      <CandidateDisplay
        :candidate="candidate"
        :visible="visible"
      />
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
