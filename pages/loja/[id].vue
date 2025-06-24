<template>
  <section class="perfil-loja">
    <!-- Cabeçalho da loja -->
    <div class="cabecalho-loja">
      <div class="foto-loja">
        <img :src="lojaAtual?.imagem || '/img/loja-placeholder.jpg'" :alt="lojaAtual?.nome" />
      </div>
      <h1 class="nome-loja">{{ lojaAtual?.nome }}</h1>
    </div>

    <!-- Cupons -->
    <section class="secao-loja">
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
    </section>

    <!-- Produtos -->
    <section class="secao-loja">
      <Divisor title="Produtos" />
      <div class="produtos-container">
        <Card_produto
          v-for="produto in produtos.slice(0, 12)"
          :key="produto.id"
          :produto="produto"
          :imagem="produto.imagens?.[0] || '/img/produto-placeholder.jpg'"
          :avaliacao="produto.media_nota || 0"
          :totalAvaliacoes="produto.reviews?.length || 0"
          :favoritado="false"
        />
      </div>
    </section>
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
  padding: 40px 20px;
  background-color: #f8fafc;
}

.cabecalho-loja {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
  text-align: center;
}

.foto-loja {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  padding: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  border: 2px solid #fff;
  overflow: hidden;
}

.foto-loja:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.foto-loja img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.nome-loja {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  position: relative;
  padding-bottom: 12px;
}

.nome-loja::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 3px;
}

/* Blocos */
.secao-loja {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 64px;
  padding: 0 16px;
}

/* Cupons */
.cupons-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

/* Produtos */
.produtos-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin-top: 24px;
}

/* Responsividade */
@media (max-width: 1200px) {
  .produtos-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 900px) {
  .produtos-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .produtos-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .produtos-container,
  .cupons-container {
    grid-template-columns: 1fr;
  }

  .foto-loja {
    width: 110px;
    height: 110px;
  }

  .nome-loja {
    font-size: 22px;
  }

  .cabecalho-loja {
    margin-bottom: 40px;
  }
}
</style>
