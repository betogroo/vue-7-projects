<script setup lang="ts">
interface Props {
  uppercaseText?: boolean
  text: string
  align?: 'center' | 'right' | 'left'
}
const props = withDefaults(defineProps<Props>(), {
  uppercaseText: true,
  align: 'center',
})

let textClass = `text-${props.align}`
if (props.uppercaseText) textClass += ' text-uppercase'
</script>

<template>
  <div
    class="text-h5"
    :class="textClass"
  >
    {{ text }}
  </div>
</template>
