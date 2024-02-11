<script setup lang="ts">
import { Candidate } from '../types/Voting'

interface Props {
  candidates: Candidate[]
}
defineProps<Props>()
</script>

<template>
  <v-list v-if="candidates.length">
    <v-list-item
      v-for="{ id, name, candidate_number } in candidates"
      :key="id!"
    >
      {{ name }} - {{ candidate_number }}
    </v-list-item>
  </v-list>
  <v-card v-else>Sem candidatos</v-card>
</template>
