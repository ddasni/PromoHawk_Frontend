<template>
  <section class="perfil-loja">
    <div class="fundo" :style="{ backgroundColor: lojaAtual?.cor || '#0057d9' }"></div>

    <div class="foto-loja">
      <img :src="lojaAtual?.imagem" :alt="lojaAtual?.nome">
    </div>

    <h1 class="nome-loja">{{ lojaAtual?.nome }}</h1>

    <!-- 🔥 Seção de Cupons -->
    <div class="secao">
      <h2>Cupons Disponíveis</h2>
      <div class="container-cards">
        <Cupom
          v-for="cupom in cupons.slice(0, 9)"
          :key="cupom.id"
          :codigo="cupom.codigo"
          :desconto="cupom.desconto"
          :validade="cupom.validade"
          :descricao="cupom.descricao"
        />
      </div>
    </div>

    <hr class="divisor" />

    <!-- 🔥 Seção de Produtos -->
    <div class="secao">
      <h2>Produtos em Destaque</h2>
      <div class="container-cards">
        
        <Card_produto />
        <Card_produto />
        <Card_produto />
      </div>
    </div>
  </section>
</template>

<script setup>
import Cupom from "~/components/Common/Cards/Card_cupom.vue"
import Card_produto from '~/components/Common/Cards/Card_produto.vue'

const route = useRoute()
const nomeLoja = computed(() => route.params.nome?.toString().toLowerCase())

const lojas = {
  amazon: {
    nome: 'Amazon',
    imagem: 'https://logospng.org/download/amazon/logo-amazon-2048.png',
    cor: '#232f3e'
  },
  magazineluiza: {
    nome: 'Magazine Luiza',
    imagem: 'https://logodownload.org/wp-content/uploads/2019/03/magalu-logo-0.png',
    cor: '#0077cc'
  },
  centauro: {
    nome: 'Centauro',
    imagem: 'https://logodownload.org/wp-content/uploads/2017/06/centauro-logo.png',
    cor: '#c8102e'
  },
  mercadolivre: {
    nome: 'Mercado Livre',
    imagem: 'https://logodownload.org/wp-content/uploads/2019/11/mercado-livre-logo.png',
    cor: '#ffe600'
  },
  kabum: {
    nome: 'Kabum',
    imagem: 'https://logodownload.org/wp-content/uploads/2017/03/kabum-logo.png',
    cor: '#004aad'
  },
  pichau: {
    nome: 'Pichau',
    imagem: 'https://logodownload.org/wp-content/uploads/2020/07/pichau-logo.png',
    cor: '#111111'
  }
}

const lojaAtual = computed(() => lojas[nomeLoja.value] || {})

const { data: cuponsData, error: errorCupons } = await useFetch('https://api.promohawk.com.br/api/cupom')
const cupons = computed(() => cuponsData.value?.cupons || [])
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

.secao {
  width: 90%;
  max-width: 1200px;
  margin-top: 40px;
}

.secao h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.container-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.divisor {
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  border: none;
  border-top: 2px solid #e0e0e0;
}
</style>



