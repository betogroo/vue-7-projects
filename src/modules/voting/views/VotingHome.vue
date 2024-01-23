<script setup lang="ts">
import {
  NumericKeyboard,
  ActionKeyboard,
  DisplayCard,
  DisplayEnd,
} from '../components'
import { useConfigStore } from '../store/useConfigStore'
import { useVoting } from '../composables'
import { useConfig } from '../composables'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { config } = storeToRefs(configStore)

// composables
const {
  numericDisplay,
  selectedCandidate,
  candidateCard,
  addVote,
  enableVoting,
  fetchCandidates,
  resetDisplay,
  updateDisplay,
} = useVoting()
const { fetchConfig, setConfig } = useConfig()

const confirmVote = async () => {
  await setConfig({ id: config.value?.id, ready: false })
  await addVote(+numericDisplay.value)
}

await fetchConfig()
await fetchCandidates()
</script>
<template>
  <v-container class="pa-1 ma-1">
    <v-row
      justify="center"
      no-gutters
    >
      <v-col cols="12">
        <v-sheet
          class="text-h4 text-center"
          :class="config?.uppercase ? 'text-uppercase' : ''"
          >{{ config?.organization }}</v-sheet
        >
      </v-col>
      <v-col
        class="text-center d-flex align-center justify-center"
        cols="12"
        sm="8 "
      >
        <template v-if="!config?.ready">
          <DisplayEnd @release-vote="enableVoting" />
        </template>
        <DisplayCard
          v-else
          v-model="numericDisplay"
          :candidate="selectedCandidate"
          :uppercase="config.uppercase!"
          :visible="candidateCard"
        />
      </v-col>
      <v-col class="d-flex flex-column align-center">
        <NumericKeyboard
          :keyboard-disabled="candidateCard"
          @handle-click="updateDisplay"
        />
        <ActionKeyboard
          :confirm-disabled="!candidateCard || selectedCandidate === undefined"
          :reset-disabled="!numericDisplay.length"
          @handle-confirm="confirmVote"
          @handle-reset="resetDisplay"
        />
      </v-col>
    </v-row>
    <v-btn :to="{ name: 'AdminHome' }">Admin</v-btn>
  </v-container>
</template>
