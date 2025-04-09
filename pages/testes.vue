<template>
  <div class="container">
    <Nav />
    <br><br>
    <Botao nome="teste" size="sm" color="tres"/>
    <br><br>
    <User />
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'basic'
})

import Nav from '~/components/Header/NavigationMenu.vue';
import Botao from '~/components/buttons/botao.vue';
import User from '~/components/Header/user_icon.vue'

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