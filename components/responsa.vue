<template>
  <div>
    <p v-if="width < 768">Modo Mobile</p>
    <p v-else>Modo Desktop</p>

  </div>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

</script>

<style>

</style>