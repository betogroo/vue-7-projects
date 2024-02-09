<script setup lang="ts">
import type { BallotBox } from '../types/Voting'

interface Props {
  ballotsBox: BallotBox[]
}
defineProps<Props>()
</script>

<template>
  <v-card v-if="!ballotsBox.length">Ainda não temos urnas cadastradas</v-card>
  <v-card
    v-for="item in ballotsBox"
    :key="item.id"
    class="ma-1"
    :title="item.site || ''"
    variant="outlined"
    width="250"
  >
    <v-responsive :aspect-ratio="16 / 9">
      <v-card-subtitle>{{ item.id }}</v-card-subtitle>
      <v-card-text> </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn
          block
          :to="{ name: 'BallotBoxView', params: { id: item.id } }"
          >Ir para urna</v-btn
        >
        <v-btn
          block
          :to="{ name: 'BallotBoxAdmin', params: { id: item.id } }"
          >Monitorar</v-btn
        >
      </v-card-actions>
    </v-responsive>
  </v-card>
</template>
