<script setup lang="ts">
import { AppsCard } from '../components'
import { AppParam } from '../types/Main'

const apps: AppParam[] = [
  {
    title: 'Password Generator',
    description: 'Gere senhas seguras e difíceis de ser quebradas',
    name: { name: 'PasswordHome' },
  },
  {
    title: 'Voting System',
    description: 'Sistema de votação, com contabilização de votos',
    name: { name: 'VotingHome' },
  },
]
</script>
<template>
  <v-container class="d-flex justify-center">
    <AppsCard
      v-for="app in apps"
      :key="app.name.name"
      :description="app.description"
      :name="app.name"
      :title="app.title"
    />
  </v-container>
</template>
