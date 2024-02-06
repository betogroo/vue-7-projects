<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox } from '../composables'

import { computed, ref } from 'vue'

const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()
const { ballotBox } = storeToRefs(ballotBoxStore)

const { setBallotBoxReady } = useBallotBox()

const { voters } = storeToRefs(voterStore)
const voter_ra = ref<string>()

const voter = computed(() =>
  voters.value.find((item) => item.id === voter_ra.value),
)

const releaseVote = async () => {
  console.log(voter.value?.id)
  await setBallotBoxReady(ballotBox.value!.id, voter.value!.id)
}
</script>

<template>
  <v-container v-if="ballotBox">
    <h1>
      Aqui é a página de monitoramento da urna
      {{ ballotBox.id }}
    </h1>
    <template v-if="ballotBox.ready"
      >Liberado para o usuário {{ ballotBox.ready }}</template
    >
    <template v-else>
      <v-autocomplete
        v-model="voter_ra"
        base-color="white"
        density="compact"
        item-title="ra"
        item-value="id"
        :items="voters"
        label="Candidatos"
        type="number"
        variant="outlined"
      ></v-autocomplete
    ></template>

    <div v-if="voter">
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
    <div v-else>Nenhum candidato selecionado</div>
  </v-container>
</template>
