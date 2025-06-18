<template>
  <br />
  <Carousel />
  <br /><br />

  <!-- Categorias -->
  <Divisor title="Categorias" link="/lista?tipo=categoria" />
  <div class="categorias-container">
    <Categoria
      v-for="categoria in categorias.slice(0, 7)"
      :key="categoria.id"
      :categoria="categoria"
    />
  </div>

  <!-- Produtos -->
  <Divisor title="Produtos" link="/lista?tipo=produto" />
  <div class="produtos-container">
    <Produto
      v-for="produto in produtos.slice(0, 9)"
      :key="produto.id"
      :produto="produto"
      :imagem="produto.imagens?.[0] || '/img/sem-imagem.png'"
      :avaliacao="produto.media_nota || 0"
      :totalAvaliacoes="produto.reviews?.length || 0"
      :favoritado="false"
    />
  </div>

  <!-- Cupons -->
  <br />
  <Divisor title="Cupons" link="/Cupons" />
  <div class="cupons-container">
    <Cupom
      v-for="cupom in cupons.slice(0, 9)"
      :key="cupom.id"
      :codigo="cupom.codigo"
      :desconto="cupom.desconto"
      :validade="cupom.validade"
      :descricao="cupom.descricao"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import Carousel from '~/components/Home/Carousel.vue'
import Divisor from "~/components/Home/Divisor.vue";
import Categoria from "~/components/Home/Categoria.vue";
import Produto from "~/components/Common/Cards/Card_produto.vue";
import Cupom from "~/components/Common/Cards/Card_cupom.vue"

// Produtos
const { data: produtosData, error: errorProdutos } = await useFetch(`https://api.promohawk.com.br/api/produto`)
const produtos = computed(() => {
  if (errorProdutos.value) return []
  if (produtosData.value?.produto) return [produtosData.value.produto]
  if (Array.isArray(produtosData.value?.produtos)) return produtosData.value.produtos
  return []
})

// Categorias
const { data: categoriasData, error: errorCategorias } = await useFetch(`https://api.promohawk.com.br/api/categoria`)
const categorias = computed(() => {
  const data = categoriasData.value
  if (errorCategorias.value || !data) return []
  return Array.isArray(data.categorias) ? data.categorias.filter(c => c?.id) : []
})

// Cupons
const { data: cuponsData, error: errorCupons } = await useFetch('https://api.promohawk.com.br/api/cupom')
const cupons = computed(() => cuponsData.value?.cupons || [])
</script>

<style scoped>
/* Categorias */
.categorias-container {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 8px 0;
  margin-bottom: 32px;
  scroll-snap-type: x mandatory;
}

.categorias-container::-webkit-scrollbar {
  display: none;
}

.categorias-container > * {
  flex: 0 0 auto;
  scroll-snap-align: center;
}

/* Produtos */
.produtos-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  justify-content: center;
  margin-bottom: 32px;
  padding: 0 12px;
}

/* Cupons */
.cupons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 64px;
  padding: 0 12px;
}
</style>