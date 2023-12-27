<script setup lang="ts">
interface Props {
  color: string
  icon?: string
}
withDefaults(defineProps<Props>(), {
  icon: 'mdi-help-circle-outline',
})

const showTooltip = defineModel<boolean>()
</script>

<template>
  <v-tooltip
    v-model="showTooltip"
    :content-class="`bg-${color}`"
    :open-on-click="true"
    width="100%"
  >
    <template #activator="{ props }">
      <v-btn
        :color="color"
        density="compact"
        icon
        variant="text"
        v-bind="props"
      >
        <v-icon :icon="icon"
      /></v-btn>
    </template>
    <slot />
  </v-tooltip>
</template>
