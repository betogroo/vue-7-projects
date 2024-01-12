<script setup lang="ts">
import { NumericBtn } from '.'

const $emit = defineEmits<{
  'handle-click': [value: number | string]
}>()

const handleClick = (value: number | string) => {
  $emit('handle-click', value)
}
</script>

<template>
  <v-card
    class="mt-2 ml-1"
    max-width="300"
    variant="outlined"
  >
    <v-card-text class="text-center">
      <v-row>
        <v-col cols="4"
          ><NumericBtn
            :value="7"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><NumericBtn
            :value="8"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><NumericBtn
            :value="9"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="4"
          ><NumericBtn
            :value="4"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><NumericBtn
            :value="5"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><NumericBtn
            :value="6"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="4"
          ><NumericBtn
            :value="1"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><NumericBtn
            :value="2"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><NumericBtn
            :value="3"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
      <v-row>
        <v-col
          ><NumericBtn
            :value="0"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
