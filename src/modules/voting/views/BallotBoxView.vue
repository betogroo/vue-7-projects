<script setup lang="ts">
import { useBallotBoxStore } from '../store/useBallotBoxStore'
interface Props {
  id: string
}
defineProps<Props>()

const ballotBoxStore = useBallotBoxStore()
</script>

<template>
  <div>Urna {{ id }}</div>
  {{ ballotBoxStore.ballotBox }}

  Nesta tela terei que carregar a eleição, os candidatos dessa eleição, as opçõe
  s da urna
</template>
