<template>
  <div class="container">
    <Botao/>
    <br>
    <Icon name="icon-local:search"/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "basic",
});

import Botao from '~/components/Common/botao.vue'
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
