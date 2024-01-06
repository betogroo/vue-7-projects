<script setup lang="ts">
import { version as vuetifyVersion } from 'vuetify'
import { version as vueVersion } from 'vue'
const appVersion = __APP_VERSION__
const appName = __APP_NAME__
</script>
<template>
  <v-container>
    <v-responsive class="align-center text-center">
      <v-row>
        <v-col cols="12">
          <h2>{{ appName }}</h2>
          <h4>{{ appVersion }}</h4>
        </v-col>
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
