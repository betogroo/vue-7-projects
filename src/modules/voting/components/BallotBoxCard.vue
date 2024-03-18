<script setup lang="ts">
import type { BallotBox } from '../types/Voting'

interface Props {
  ballotsBox: BallotBox[]
}
defineProps<Props>()

const $emit = defineEmits<{
  'handle-disable': [ballot_box_id: string]
  'handle-enable': [ballot_box_id: string]
}>()

const handleDisable = (ballot_box_id: string) => {
  $emit('handle-disable', ballot_box_id)
}
const handleEnable = (ballot_box_id: string) => {
  $emit('handle-enable', ballot_box_id)
}
</script>

<template>
  <template v-if="!ballotsBox.length">
    <slot
      v-if="$slots.noData"
      name="noData"
    ></slot>
    <div v-else>Nenhum dado a exibir</div>
  </template>
  <v-card
    v-for="item in ballotsBox"
    :key="item.id"
    class="ma-1"
    :color="item.ready ? 'green' : 'red'"
    :loading="item.ready ? true : false"
    :title="item.site || ''"
    variant="outlined"
  >
    <v-responsive :aspect-ratio="16 / 9">
      <v-card-actions class="d-flex flex-column">
        <v-btn
          block
          :to="{ name: 'BallotBoxView', params: { id: item.id } }"
          >Ir para urna</v-btn
        >
        <v-btn
          v-if="item.ready"
          block
          @click="handleDisable(item.id)"
          >Desativar</v-btn
        >
        <v-btn
          v-else
          block
          @click="handleEnable(item.id)"
          >Ativar</v-btn
        >
      </v-card-actions>
    </v-responsive>
  </v-card>
</template>
