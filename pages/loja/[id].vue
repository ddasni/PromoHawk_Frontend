<template>
  <!-- Template permanece EXATAMENTE o mesmo -->
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
    <Divisor title="Produtos" />
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
/* Script permanece EXATAMENTE o mesmo */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.foto-loja:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.foto-loja img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
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

/* Cupons */
.cupons-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0 56px;
  padding: 0 16px;
}

/* Produtos */
.produtos-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  overflow-x: auto;
  gap: 24px;
  padding: 0 16px 56px;
  scroll-snap-type: x mandatory;
  scroll-padding: 16px;
}

.produtos-container::-webkit-scrollbar {
  height: 6px;
  background-color: #f1f5f9;
}

.produtos-container::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 3px;
}

.produtos-container > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .perfil-loja {
    padding: 32px 16px;
  }
  
  .foto-loja {
    width: 130px;
    height: 130px;
  }
  
  .nome-loja {
    font-size: 24px;
  }
  
  .cupons-container {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
  
  .produtos-container {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .cabecalho-loja {
    margin-bottom: 40px;
  }
  
  .foto-loja {
    width: 110px;
    height: 110px;
  }
  
  .nome-loja {
    font-size: 22px;
  }
  
  .cupons-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>