<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BallotBoxCard, BallotBoxForm } from '../components'
import { useElectionStore } from '../store/useElectionStore'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useVoterStore } from '../store/useVoterStore'
import { useBallotBox } from '../composables'

interface Props {
  id: number
}

defineProps<Props>()

const { addBallotBox } = useBallotBox()

const electionStore = useElectionStore()
const ballotBoxStore = useBallotBoxStore()
const voterStore = useVoterStore()

const { ballotsBox } = storeToRefs(ballotBoxStore)
const { election } = storeToRefs(electionStore)
const { voters } = storeToRefs(voterStore)
</script>

<template>
  <h1>Administração e Contabilização {{ id }}</h1>
  <h2>{{ election?.name }} ({{ election?.organization }})</h2>
  <h3>Data da Eleição: {{ election?.date }}</h3>

  <BallotBoxForm @handle-submit="(site) => addBallotBox(id, site)" />
  <div class="d-flex flex-wrap justify-center">
    <BallotBoxCard :ballots-box="ballotsBox" />
  </div>

  <v-card
    title="Eleitores"
    variant="flat"
  >
    <v-card-text
      v-for="{ name, id } in voters"
      :key="id"
    >
      {{ name }}
    </v-card-text>
  </v-card>
</template>
