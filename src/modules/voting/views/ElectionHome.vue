<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useElectionStore } from '../store/useElectionStore'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
import { useBallotBox } from '../composables'

interface Props {
  id: number
}

defineProps<Props>()

const { addBallotBox } = useBallotBox()

const electionStore = useElectionStore()
const { election } = storeToRefs(electionStore)
const ballotBoxStore = useBallotBoxStore()
const { ballotsBox } = storeToRefs(ballotBoxStore)
</script>

<template>
  <h1>Administração e Contabilização {{ id }}</h1>
  <h2>{{ election?.name }} ({{ election?.organization }})</h2>
  <h3>Data da Eleição: {{ election?.date }}</h3>
  <v-btn @click="addBallotBox(id)">Adicionar Urna</v-btn>

  <v-sheet v-if="ballotsBox">
    <v-card
      v-for="item in ballotsBox"
      :key="item.id"
    >
      Urna {{ item.id }}
    </v-card>
  </v-sheet>
</template>
