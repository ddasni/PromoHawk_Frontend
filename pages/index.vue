<template>
  <br>
  <Carousel/>
  <br>
  <br>
  <Divisor titulo="Categorias" actionTexto="ver mais >" link="" />
    <Categoria size="sm" nome="Eletrônicos" imgSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fvetores-premium%2Fgrupo-de-dispositivos-eletronicos-conjunto-de-icones-desenho-de-ilustracao-vetorial_1250153-9784.jpg&f=1&nofb=1&ipt=7461f6dd01d87d4a820c2cf3a392a6e5504c34d504810d9c29c917fea9e032b1"/>
  <br />
  <Divisor titulo="Destaques" actionTexto="ver mais >" link="" />
    <div class="produtos-container">
      <Produto
        v-for="produto in produtos"
        :key="produto.id"
        :produto="produto"
        :avaliacao="4.5"
        :totalAvaliacoes="0"
        :favoritado="false"
      />
    </div>
    <br />
  <Divisor titulo="Cupons" actionTexto="ver mais >" link="" />
  <Cupons/>
</template>

<script setup>
import { ref } from 'vue'

import Carousel from '~/components/Home/Carousel.vue'
import Divisor from "~/components/Home/Divisor.vue";
import Categoria from "~/components/Home/Categoria.vue";
import Produto from "~/components/Common/Cards/Card_produto.vue";
import Cupons from "~/components/Common/Cards/Card_cupom.vue";

// importando a url da api
const config = useRuntimeConfig()
const searchQuery = ref('')

// Faz a requisição
const { data, pending, error } = await useFetch(`https://api.promohawk.com.br/api/produto`, {
  onError(error) {
    console.error('Erro ao buscar produtos:', error)
    // Você pode definir uma mensagem de erro para exibir ao usuário
  }
})

// Ajusta o dado para um array mesmo se vier só 1 produto
const produtos = computed(() => {
  if (error.value) return [] // Retorna array vazio se houver erro
  if (data.value?.produto) return [data.value.produto]
  if (Array.isArray(data.value?.produtos)) return data.value.produtos
  return []
})
</script>

<style scoped>
.produtos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
</style>