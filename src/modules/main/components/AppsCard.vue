<script setup lang="ts">
import type { AppParam } from '../types/Main'

defineProps<AppParam>()
</script>

<template>
  <v-responsive
    :aspect-ratio="16 / 9"
    max-width="200"
  >
    <v-card
      class="mx-1"
      :to="name"
      variant="outlined"
    >
      <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>
      <v-card-text class="text-justify text-caption">{{
        description
      }}</v-card-text>
    </v-card>
  </v-responsive>
</template>
