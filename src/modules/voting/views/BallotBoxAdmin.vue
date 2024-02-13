<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox, useVoters } from '../composables'

import { computed, ref } from 'vue'

interface Props {
  election_id: string
}
const props = defineProps<Props>()

const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()
const { ballotBox } = storeToRefs(ballotBoxStore)

const { setBallotBoxReady } = useBallotBox()

const { voters, availableVoters } = storeToRefs(voterStore)
const voter_ra = ref<string | null>(null)

const voter = computed(() =>
  voters.value.find((item) => item.id === voter_ra.value),
)

const releaseVote = async () => {
  console.log(voter.value?.id)
  await setBallotBoxReady(ballotBox.value.id, voter.value!.id)
  await useVoters().fetchAvailableVoters(props.election_id)
  voter_ra.value = null
}
</script>

<template>
  <v-container
    v-if="ballotBox"
    class="fill-height"
  >
    <v-card
      class="fill-height w-100"
      :color="ballotBox.ready ? 'success' : 'error'"
      title="Monitoramento de Urna"
      variant="outlined"
    >
      <template v-if="ballotBox.ready">
        <v-progress-circular
          color="success"
          indeterminate
        ></v-progress-circular>
        Aguarde o Candidato terminar seu voto</template
      >
      <template v-else>
        <div v-if="!voter">
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
        </div>
        <div v-else>
          <v-row>
            <v-col>Nome</v-col>
            <v-col>{{ voter.name }}</v-col>
          </v-row>
          <v-row>
            <v-col>Número do RA</v-col>
            <v-col>{{ voter.ra }}</v-col>
          </v-row>
          <v-row>
            <v-col
              ><v-btn
                block
                @click="releaseVote"
              >
                Liberar Voto</v-btn
              ></v-col
            >
          </v-row>
        </div>
      </template>
    </v-card>
  </v-container>
</template>
