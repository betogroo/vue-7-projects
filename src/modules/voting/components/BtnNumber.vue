<script setup lang="ts">
interface Props {
  value: number | string
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'black',
})

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
    :color="color"
    width="100"
    @click.prevent="handleClick"
  >
    <template #default>
      <h1>{{ value }}</h1>
    </template>
  </v-btn>
</template>
