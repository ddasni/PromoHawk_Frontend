<template>
  <div class="container">
    <Botao nome="teste" size="sm" color="tres"/>
    <br><br>
    <User />
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'basic'
})

import Botao from '~/components/buttons/botao.vue';
import User from '~/components/Header/user_icon.vue'

</script>

<style scoped>
.container {
width: 90vw;
height: 90vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 30px;
}
</style>