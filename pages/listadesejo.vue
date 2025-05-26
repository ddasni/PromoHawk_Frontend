<template>
  <div class="wishlist-container">
    <h1 class="titulo-pagina">Minha Lista de Desejos</h1>

    <div v-if="itens.length > 0" class="lista-itens">
      <div class="item-desejo" v-for="item in itens" :key="item.id">
        <img :src="item.imagem" alt="Foto do Produto" class="imagem-produto" />
        <div class="detalhes">
          <h2 class="nome-produto">{{ item.nome }}</h2>
          <p class="preco-atual">Preço atual: R$ {{ item.preco.toFixed(2) }}</p>
          
        </div>
      </div>
    </div>

    <div v-else class="sem-itens">
      Sua lista de desejos está vazia. Adicione produtos para acompanhar preços!
    </div>
  </div>
</template>

<script setup>
// pagina protegida por meio do token de login
definePageMeta({
  middleware: 'auth'
})


import { ref } from 'vue';

const itens = ref([
  {
    id: 1,
    nome: 'Smartphone Samsung Galaxy S23',
    preco: 3999.90,
    imagem: '' 
  },
  {
    id: 2,
    nome: 'Robim buxa',
    preco: 1.00,
    imagem: ''
  }
]);
</script>


<style scoped>
.wishlist-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.titulo-pagina {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.lista-itens {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item-desejo {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
}

.item-desejo:hover {
  background-color: #eef3f8;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.15);
}

.imagem-produto {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.detalhes {
  flex: 1;
}

.nome-produto {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.preco-atual {
  font-size: 16px;
  color: #007bff;
  margin-bottom: 6px;
}

.notificacao-ativa {
  display: inline-block;
  font-size: 14px;
  color: #28a745;
  background: #eafaf1;
  padding: 4px 10px;
  border-radius: 8px;
}
.sem-itens {
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-top: 40px;
}
</style>
