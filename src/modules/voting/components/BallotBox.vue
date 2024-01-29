<script setup lang="ts">
import { BallotBox } from '../types/Voting'

interface Props {
  ballotsBox: BallotBox[] | undefined
}
defineProps<Props>()
</script>

<template>
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
      <v-card-text>Pronta da voto: {{ item.ready }} </v-card-text>
    </v-responsive>
  </v-card>
</template>
