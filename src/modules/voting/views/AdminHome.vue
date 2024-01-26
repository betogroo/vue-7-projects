<script setup lang="ts">
import { useElectionStore } from '../store/useElectionStore'
const electionStore = useElectionStore()
</script>

<template>
  <h1>Administração e Contabilização</h1>
  <h2>Total de Eleições cadastradas: {{ electionStore.totalElections }}</h2>
</template>
