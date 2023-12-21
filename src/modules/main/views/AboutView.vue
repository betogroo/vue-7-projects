<script setup lang="ts">
import { version as vuetifyVersion } from 'vuetify'
import { version as vueVersion } from 'vue'
</script>
<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row>
        <v-col>
          <v-img src="@/assets/vue.svg" />
          {{ vueVersion }}
        </v-col>
        <v-col>
          <v-img src="@/assets/logo.png" />
          {{ vuetifyVersion }}
        </v-col>
      </v-row>
      <div class="py-14" />
    </v-responsive>
  </v-container>
</template>
