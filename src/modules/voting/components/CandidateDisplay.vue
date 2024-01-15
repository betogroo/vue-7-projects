<script setup lang="ts">
interface Props {
  visible: boolean
}
withDefaults(defineProps<Props>(), {
  visible: false,
})
</script>

<template>
  <v-row
    align="center"
    :style="{ visibility: visible ? 'visible' : 'hidden' }"
  >
    <v-col cols="4"><h4>Nome:</h4></v-col>
    <v-col>
      <span>Nome do Grêmio escolhido</span>
    </v-col>
  </v-row>
</template>
