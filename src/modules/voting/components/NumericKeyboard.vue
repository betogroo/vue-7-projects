<script setup lang="ts">
import { NumericBtn } from '.'
import { useSound } from '@vueuse/sound'
import numericKeySound from '@/assets/voting_sounds/key.wav'

interface Props {
  keyboardDisabled: boolean
}
withDefaults(defineProps<Props>(), {
  keyboardDisabled: false,
})

const $emit = defineEmits<{
  'handle-click': [value: number | string]
}>()
const { play } = useSound(numericKeySound)
const handleClick = (value: number | string) => {
  play()
  $emit('handle-click', value)
}
</script>

<template>
  <v-card
    class="mt-2 ml-1 rounded-xl"
    :disabled="keyboardDisabled"
    max-width="300"
    :ripple="false"
    variant="text"
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
