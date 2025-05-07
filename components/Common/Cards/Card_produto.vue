<template>
  <div class="card-produto">
    <img :src="imagem" :alt="nome" class="produto-img" />
    
    <div class="produto-info">
      <h3>{{ nome }}</h3>
      <div class="precos">
        <span class="preco-atual">R$ {{ precoAtual.toFixed(2) }}</span>
        <span v-if="precoOriginal" class="preco-original">R$ {{ precoOriginal.toFixed(2) }}</span>
      </div>
    </div>

    <div class="acoes">
      <button class="favoritar">
        ❤️
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imagem: String,
  nome: String,
  precoAtual: Number,
  precoOriginal: Number
})
</script>

<style scoped>
.card-produto {
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  background: white;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.produto-img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.produto-info {
  margin-top: 12px;
}

.precos {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: baseline;
}

.preco-atual {
  font-size: 1.4rem;
  font-weight: bold;
  color: #000;
}

.preco-original {
  text-decoration: line-through;
  color: #888;
  font-size: 1rem;
}

.acoes {
  margin-top: 12px;
}

.favoritar {
  border: none;
  background: #fff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  font-size: 1.2rem;
}
</style>