<template>
  <div>
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
</template>

<script setup>
import { ref } from 'vue'
import Produto from "~/components/Common/Cards/Card_produto.vue";

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
</script>

<style>

</style>