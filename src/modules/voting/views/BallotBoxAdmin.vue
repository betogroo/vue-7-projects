<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox, useVoters } from '../composables'

import { ref, watch } from 'vue'
import { Voter } from '../types/Voting'

const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()
const { ballotBox } = storeToRefs(ballotBoxStore)

const { setBallotBoxReady } = useBallotBox()
const { fetchAvailableVoters } = useVoters()

const { availableVoters } = storeToRefs(voterStore)
const voter_ra = ref<string>('')
const voter = ref<Voter | null>(null)
const form = ref(false)

const newRelease = async () => {
  form.value = true
  await fetchAvailableVoters(ballotBox.value.election_id)
}

const resetRelease = async () => {
  await setBallotBoxReady(ballotBox.value.id, null)
  await fetchAvailableVoters(ballotBox.value.election_id)
  voter_ra.value = ''
  form.value = false
  voter.value = null
}

const releaseVote = async () => {
  await setBallotBoxReady(ballotBox.value.id, voter.value!.id)
  await fetchAvailableVoters(ballotBox.value.election_id)
}

const searchVoter = async () => {
  if (!voter_ra.value) voter.value = null
  voter.value =
    availableVoters.value.find((item) => item.ra === +voter_ra.value) || null
  console.log(voter.value)
}

watch(
  () => ballotBox.value.ready,
  async (newValue) => {
    if (newValue === null) {
      await resetRelease()
    }
  },
)
</script>

<template>
  <v-container
    v-if="ballotBox"
    class="justify-center fill-height w-100"
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
          class="mb-3"
          color="success"
          :disabled="form"
          @click="newRelease"
          >Nova Liberação</v-btn
        >
        <v-sheet v-if="!voter && form">
          <v-form @submit.prevent="searchVoter">
            <v-text-field
              v-model.number="voter_ra"
              type="number"
            ></v-text-field>
            <v-btn
              :disabled="voter_ra === null"
              type="submit"
              >Pesquisar Eleitor</v-btn
            >
          </v-form>
        </v-sheet>
        <v-sheet v-if="voter">
          <v-list>
            <v-list-item>
              <v-list-item-title class="text-h5">{{
                voter.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-h6">{{
                voter.ra
              }}</v-list-item-subtitle>
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
