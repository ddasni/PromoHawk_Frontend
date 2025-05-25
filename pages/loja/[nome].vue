<template>
  <section class="perfil-loja">
    <div class="fundo" :style="{ backgroundColor: lojaAtual?.cor || '#0057d9' }"></div>

    <div class="foto-loja">
      <img :src="lojaAtual?.imagem" :alt="lojaAtual?.nome">
    </div>

    <h1 class="nome-loja">{{ lojaAtual?.nome }}</h1>
  </section>
</template>

<script setup>
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
</style>


