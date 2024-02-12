<script setup lang="ts">
import { ref } from 'vue'

const $emit = defineEmits<{
  handleSubmit: [data: string]
}>()

const site = ref<string>('')

const onSubmit = () => {
  $emit('handleSubmit', site.value)
}
</script>

<template>
  <v-form
    class="ma-1 pa-1"
    @submit.prevent="onSubmit"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="site"
          density="compact"
          :hide-details="true"
          label="Local da Urna"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn
          :disabled="site === '' || site.length < 6"
          type="submit"
          >Adicionar Urna</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
