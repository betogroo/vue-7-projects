<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { AppBar } from '@/shared/components'
</script>
<template>
  <v-app>
    <AppBar v-if="!route.meta.hideNavBar" />
    <v-main>
      <Suspense>
        <template #fallback>Loading</template>
        <RouterView />
      </Suspense>
    </v-main>
  </v-app>
</template>
