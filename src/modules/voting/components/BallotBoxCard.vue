<script setup lang="ts">
import { ref } from 'vue'
import type { BallotBox, Voter } from '../types/Voting'

interface Props {
  ballotsBox: BallotBox[] | undefined
  voters: Voter[]
}
defineProps<Props>()

const test = ref()
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
      <v-card-text>
        <template v-if="item.ready"
          >Liberado para o usuario {{ item.ready }}</template
        >
        <template v-else>
          <v-autocomplete
            v-model="test"
            base-color="white"
            density="compact"
            item-title="ra"
            item-value="id"
            :items="voters"
            label="Candidatos"
            variant="outlined"
          ></v-autocomplete
        ></template>
      </v-card-text>
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
      {{ test }}
    </v-responsive>
  </v-card>
</template>
