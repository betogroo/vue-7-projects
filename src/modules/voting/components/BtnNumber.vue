<script setup lang="ts">
interface Props {
  value: number | string
}
const props = defineProps<Props>()

const $emit = defineEmits<{
  handleClick: [value: number | string]
}>()

const handleClick = () => {
  $emit('handleClick', props.value)
}
</script>

<template>
  <v-btn
    class="ma-2"
    color="blue-grey-lighten-2"
    width="100"
    @click.prevent="handleClick"
  >
    <template #default>
      <h1>{{ value }}</h1>
    </template>
  </v-btn>
</template>
