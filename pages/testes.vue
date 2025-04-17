<template>
  <div class="container">
    <Nav />
    <br><br>
    <Botao nome="teste" size="sm" color="tres"/>
    <br><br>
    <User />
    <br><br>
    <Categoria nome="testando" src="~/assets/images/Produtos/samsung/003.jpg"/>
    <br><br>
    <Divisor titulo="Destaques" actionTexto="ver mais >" link=""/> 
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'basic'
})

import Categoria from '~/components/cards/Categoria.vue'
import Botao from '~/components/buttons/botao.vue';
import User from '~/components/Header/user_icon.vue'
import Divisor from '~/components/Divisor.vue';

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