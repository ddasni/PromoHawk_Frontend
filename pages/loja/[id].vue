<template>
  <section class="perfil-loja">
    <div class="fundo" :style="{ backgroundColor: lojaAtual?.cor || '#0057d9' }"></div>

    <div class="foto-loja">
      <img :src="lojaAtual?.imagem" :alt="lojaAtual?.nome">
    </div>

    <h1 class="nome-loja">{{ lojaAtual?.nome }}</h1>

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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Divisor from '~/components/Home/Divisor.vue'
import Cupom from '~/components/Common/Cards/Card_cupom.vue'
import Card_produto from '~/components/Common/Cards/Card_produto.vue'

const route = useRoute()
const lojaId = route.params.nome

// Loja
const { data: lojaData, error: lojaError } = await useFetch(`https://api.promohawk.com.br/api/loja/${lojaId}`)
const lojaAtual = computed(() => lojaData.value?.loja || {})

// Cupons filtrados pela loja
const { data: cuponsData, error: errorCupons } = await useFetch(`https://api.promohawk.com.br/api/cupom`)
const cupons = computed(() =>
  cuponsData.value?.cupons?.filter(c => c.loja_id == lojaAtual.value?.id) || []
)

// Produtos da loja
const { data: produtosData, error: errorProdutos } = await useFetch(`https://api.promohawk.com.br/api/produto?loja_id=${lojaId}`)
const produtos = computed(() => produtosData.value?.produtos || [])
</script>

<style scoped>
.perfil-loja {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 100px;
}

.fundo {
  width: 100vw;
  height: 200px;
}

.foto-loja {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: white;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.foto-loja img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
}

.nome-loja {
  margin-top: 120px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

/* Cupons */
.cupons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  justify-content: center;
  margin: 24px 0 48px;
  padding: 0 12px;
}

/* Produtos */
.produtos-container {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 0 12px;
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




