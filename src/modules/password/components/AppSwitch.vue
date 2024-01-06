<script setup lang="ts">
interface Props {
  title: string
  color?: string
}
withDefaults(defineProps<Props>(), {
  color: 'primary',
})

const $emit = defineEmits<{
  toggleSwitch: []
}>()

//const _switch = ref<boolean>(false)

const toggleSwitch = () => {
  $emit('toggleSwitch')
}
</script>

<template>
  <v-row align="center">
    <v-col>
      <div>{{ title }}</div>
    </v-col>
    <v-col>
      <v-switch
        :color="color"
        hide-details
        @update:model-value="toggleSwitch()"
      />
    </v-col>
  </v-row>
</template>
