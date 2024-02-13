<script setup lang="ts">
import type { BallotBox } from '../types/Voting'

interface Props {
  ballotsBox: BallotBox[]
}
defineProps<Props>()

const $emit = defineEmits<{
  'handle-disable': [ballot_box_id: string]
}>()

const handleDisable = (ballot_box_id: string) => {
  $emit('handle-disable', ballot_box_id)
}
</script>

<template>
  <v-card v-if="!ballotsBox.length">Ainda não temos urnas cadastradas</v-card>
  <v-card
    v-for="item in ballotsBox"
    :key="item.id"
    class="ma-1"
    :color="item.ready ? 'green' : 'red'"
    :title="item.site || ''"
    variant="outlined"
  >
    <v-responsive :aspect-ratio="16 / 9">
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
        <v-btn
          v-if="item.ready"
          block
          @click="handleDisable(item.id)"
          >Desabilitar</v-btn
        >
      </v-card-actions>
    </v-responsive>
  </v-card>
</template>
