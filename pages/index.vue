<template>
  <br>
  <Carousel/>
  <br>
  <br>
  <Divisor titulo="Categorias" actionTexto="ver mais >" link="" />
    <div class="categorias-container">
      <Categoria
        v-for="categoria in categorias"
        :key="categoria.id"
        :categoria="categoria"
      />
    </div>
  <Divisor titulo="Destaques" actionTexto="ver mais >" link="" />
    <div class="produtos-container">
      <Produto
        v-for="produto in produtos"
        :key="produto.id"
        :produto="produto"
        :imagem="produto.imagens?.[1]?.imagem || '/img/sem-imagem.png'"
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

// Produtos
const {
  data: produtosData,
  error: errorProdutos,
  pending: pendingProdutos
} = await useFetch(`https://api.promohawk.com.br/api/produto`, {
  onError(error) {
    console.error('Erro ao buscar produtos:', error)
  }
})

const produtos = computed(() => {
  if (errorProdutos.value) return []
  if (produtosData.value?.produto) return [produtosData.value.produto]
  if (Array.isArray(produtosData.value?.produtos)) return produtosData.value.produtos
  return []
})


// Categorias
const {
  data: categoriasData,
  error: errorCategorias,
  pending: pendingCategorias
} = await useFetch(`https://api.promohawk.com.br/api/categoria`, {
  onError(error) {
    console.error('Erro ao buscar categorias:', error)
  }
})

const categorias = computed(() => {
  const data = categoriasData.value
  if (errorCategorias.value || !data) return []
  if (Array.isArray(data.categorias)) return data.categorias.filter(c => c?.id)
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

.categorias-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
}
</style>