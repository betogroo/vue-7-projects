<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { AppBar } from '@/shared/components'
</script>
<template>
  <v-app>
    <AppBar v-if="!route.meta.hideNavBar" />
    <Suspense>
      <v-main>
        <RouterView />
      </v-main>
      <template #fallback>Loading</template>
    </Suspense>
  </v-app>
</template>
