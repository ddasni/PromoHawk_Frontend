<template>
  <section class="perfil-loja">
    <!-- Cabeçalho da loja -->
    <div class="cabecalho-loja">
      <div class="foto-loja">
        <img :src="lojaAtual?.imagem" :alt="lojaAtual?.nome" />
      </div>
      <h1 class="nome-loja">{{ lojaAtual?.nome }}</h1>
    </div>

    <!-- Cupons da Loja -->
    <Divisor title="Cupons Disponíveis" />
    <div class="cupons-container">
      <Cupom
        v-for="cupom in cupons.slice(0, 12)"
        :key="cupom.id"
        :codigo="cupom.codigo"
        :desconto="cupom.desconto"
        :validade="cupom.validade"
        :descricao="cupom.descricao"
      />
    </div>

    <!-- Produtos da Loja -->
    <Divisor title="Produtos em Destaque" />
    <div class="produtos-container">
      <Card_produto
        v-for="produto in produtos.slice(0, 12)"
        :key="produto.id"
        :produto="produto"
        :imagem="produto.imagens?.[0] || '/img/sem-imagem.png'"
        :avaliacao="produto.media_nota || 0"
        :totalAvaliacoes="produto.reviews?.length || 0"
        :favoritado="false"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import Divisor from '~/components/Home/Divisor.vue'
import Cupom from '~/components/Common/Cards/Card_cupom.vue'
import Card_produto from '~/components/Common/Cards/Card_produto.vue'

const route = useRoute()
const lojaId = route.params.id

const { data: lojaData } = await useFetch(`https://api.promohawk.com.br/api/loja/${lojaId}`)

const lojaAtual = computed(() => lojaData.value?.loja || {})
const cupons = computed(() => lojaAtual.value?.cupons || [])
const produtos = computed(() => lojaAtual.value?.produtos || [])

watch(lojaData, () => {
  console.log('Dados da loja recebidos:', lojaData.value)
})

</script>

<style scoped>
.perfil-loja {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  background-color: #f8f9fa;
}

.cabecalho-loja {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.foto-loja {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: white;
  padding: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.foto-loja img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
}

.nome-loja {
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

/* Cupons */
.cupons-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin: 24px 0 48px;
  padding: 0 12px;
}

/* Produtos */
.produtos-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 0 12px 48px;
  scroll-snap-type: x mandatory;
}

.produtos-container::-webkit-scrollbar {
  display: none;
}

.produtos-container > * {
  flex: 0 0 auto;
  scroll-snap-align: center;
}
</style>






