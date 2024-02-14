<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox, useVoters } from '../composables'

import { computed, ref } from 'vue'

const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()
const { ballotBox } = storeToRefs(ballotBoxStore)

const { setBallotBoxReady } = useBallotBox()

const { voters, availableVoters } = storeToRefs(voterStore)
const voter_ra = ref<string | null>(null)
const form = ref(false)

const voter = computed(() =>
  voters.value.find((item) => item.id === voter_ra.value),
)

const newRelease = async () => {
  form.value = true
  await useVoters().fetchAvailableVoters(ballotBox.value.election_id)
}

const resetRelease = async () => {
  await setBallotBoxReady(ballotBox.value.id, null)
  voter_ra.value = null
  form.value = false
}

const releaseVote = async () => {
  console.log(voter.value?.id)
  await setBallotBoxReady(ballotBox.value.id, voter.value!.id)
  await useVoters().fetchAvailableVoters(ballotBox.value.election_id)
}
</script>

<template>
  <v-container
    v-if="ballotBox"
    class="justify-center fill-height w-75"
  >
    <v-card
      class="fill-height w-100 pa-4"
      :color="ballotBox.ready ? 'success' : 'error'"
      title="Monitoramento de Urna"
      variant="outlined"
    >
      <template v-if="ballotBox.ready">
        <v-progress-circular
          color="success"
          indeterminate
        ></v-progress-circular>
        Aguarde o Candidato terminar seu voto
        <v-btn
          color="error"
          @click="resetRelease"
          >Cancelar</v-btn
        >
      </template>
      <template v-else>
        <v-btn
          block
          color="success"
          :disabled="form"
          @click="newRelease"
          >Nova Liberação</v-btn
        >
        <v-sheet v-if="!voter && form">
          <v-autocomplete
            v-model="voter_ra"
            base-color="white"
            density="compact"
            item-title="ra"
            item-value="id"
            :items="availableVoters"
            label="Selecione um Eleitor"
            type="number"
            variant="outlined"
          ></v-autocomplete>
        </v-sheet>
        <v-sheet v-if="voter">
          <v-list>
            <v-list-item>
              <v-list-item-title>{{ voter.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ voter.ra }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  class="mx-2"
                  color="success"
                  @click="releaseVote"
                  >Liberar</v-btn
                >
                <v-btn
                  class="mx-2"
                  color="error"
                  @click="resetRelease"
                >
                  Cancelar</v-btn
                >
              </template>
            </v-list-item>
          </v-list>
          <v-row>
            <v-col cols="12"></v-col>
            <v-col cols="12"></v-col>
          </v-row>
        </v-sheet>
      </template>
    </v-card>
  </v-container>
</template>
