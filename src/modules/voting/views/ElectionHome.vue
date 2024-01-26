<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useElectionStore } from '../store/useElectionStore'

interface Props {
  id: number
}

defineProps<Props>()

const electionStore = useElectionStore()
const { election } = storeToRefs(electionStore)
</script>

<template>
  <h1>Administração e Contabilização {{ id }}</h1>
  <h2>{{ election?.name }} ({{ election?.organization }})</h2>
  <h3>Data da Eleição: {{ election?.date }}</h3>
</template>
