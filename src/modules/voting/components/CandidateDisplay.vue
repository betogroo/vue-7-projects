<script setup lang="ts">
import type { Candidate } from '../types/Voting'
interface Props {
  visible: boolean
  candidate: Candidate | undefined
}
withDefaults(defineProps<Props>(), {
  visible: false,
})
</script>

<template>
  <v-row
    align="center"
    :style="{ visibility: visible ? 'visible' : 'hidden' }"
  >
    <v-col sm="4"><h4>Nome:</h4></v-col>
    <v-col>
      <span>{{ candidate ? candidate.name : 'Candidato não encontrado' }}</span>
    </v-col>
  </v-row>
</template>
