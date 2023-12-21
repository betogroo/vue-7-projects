<script setup lang="ts"></script>
<template>
  <v-container class="d-flex justify-center fill-height">
    <v-responsive max-width="250">
      <v-card
        :to="{ name: 'PasswordHome' }"
        variant="outlined"
      >
        <v-card-title>Password Generator</v-card-title>
        <v-card-text class="text-justify"
          >Gere passwords seguras e difíceis de ser quebradas</v-card-text
        >
      </v-card>
    </v-responsive>
  </v-container>
</template>
