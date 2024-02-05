<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBallotBoxStore } from '../store/useBallotBoxStore'
const ballotBoxStore = useBallotBoxStore()
const { ballotBox } = storeToRefs(ballotBoxStore)
</script>

<template>
  <v-container v-if="ballotBox">
    <h1>
      Aqui é a página de monitoramento da urna
      {{ ballotBox.id }}
    </h1>
  </v-container>
</template>
