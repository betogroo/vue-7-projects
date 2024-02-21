<script setup lang="ts">
interface Props {
  text?: string
}
withDefaults(defineProps<Props>(), {
  text: 'Nenhum dado a exibir',
})
</script>

<template>
  <v-alert
    class="mb-3"
    color="error"
    density="compact"
    icon="mdi-database-eye-off-outline"
    max-width="300"
    :title="text"
    variant="outlined"
  />
</template>
