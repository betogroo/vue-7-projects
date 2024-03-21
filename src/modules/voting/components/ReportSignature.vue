<script setup lang="ts">
interface Props {
  name: string
  title?: string
  subtitle?: string
}
withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
})
</script>

<template>
  <div>
    <div class="text-center">____________________________________</div>
    <div class="text-center">{{ `${title} ${name}` }}</div>
    <div class="text-center text-caption">{{ subtitle }}</div>
    <div class="py-4" />
  </div>
</template>
