<template>
  <div class="card-produto">
    <NuxtLink :to="`/produto/${produto.id}`" class="card-produto-link">
      <img :src="imagem" :alt="produto.nome" class="produto-img" />

      <div class="produto-info">
        <h2 class="produto-nome">{{ produto.nome }}</h2>

        <div class="precos">
          <span class="preco-atual">R$ {{ formatarPreco(precoAtual) }}</span>
        </div>

        <div class="avaliacao" v-if="avaliacao">
          <span class="estrelas">⭐ {{ formatarNumero(avaliacao) }}</span>
          <span class="total-avaliacoes" v-if="totalAvaliacoes">({{ totalAvaliacoes }})</span>
        </div>
      </div>
    </NuxtLink>

    <!-- Botão de favoritar -->
    <button class="favoritar" @click.stop="adicionarAFavoritos">
      <span :style="{ color: favoritado ? 'red' : '#999' }">
        {{ favoritado ? '❤️' : '🤍' }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  produto: {
    type: Object,
    required: true
  },
  imagem: {
    type: String,
    default: '/img/sem-imagem.png'
  },
  avaliacao: { type: Number, default: 0 },
  totalAvaliacoes: { type: Number, default: 0 }
})

const favoritado = ref(false)

// Verifica se o produto já está na lista de desejos
onMounted(() => {
  const favoritos = JSON.parse(localStorage.getItem('listaDesejos') || '[]')
  favoritado.value = favoritos.some(p => p.id === props.produto.id)
})

const precoAtual = computed(() => {
  if (!props.produto.precos || props.produto.precos.length === 0) return 0
  return parseFloat(props.produto.precos.at(-1).preco)
})

function formatarNumero(valor) {
  return typeof valor === 'number' ? valor.toFixed(2).replace('.', ',') : '0,00'
}

function formatarPreco(valor) {
  if (typeof valor !== 'number') return '0,00'
  return valor.toFixed(2).replace('.', ',')
}

function adicionarAFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem('listaDesejos') || '[]')
  const index = favoritos.findIndex(p => p.id === props.produto.id)

  if (index !== -1) {
    // Já existe, remover
    favoritos.splice(index, 1)
    favoritado.value = false
  } else {
    // Não existe, adicionar
    favoritos.push({
      id: props.produto.id,
      nome: props.produto.nome,
      preco: precoAtual.value,
      imagem: props.imagem
    })
    favoritado.value = true
  }

  localStorage.setItem('listaDesejos', JSON.stringify(favoritos))
}
</script>

<style scoped>
.card-produto-link {
  text-decoration: none;
  color: inherit;
}

.card-produto {
  width: 100%;
  max-width: 280px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
  margin-top: 24px;
}

.card-produto:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.produto-img {
  width: 100%;
  min-height: 100px;
  max-height: 180px;
  object-fit: contain;
  border-radius: 12px;
}

.produto-info {
  margin-top: 16px;
  text-align: center;
  width: 180px;
  height: 110px;
}

.produto-nome {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.avaliacao {
  font-size: 0.95rem;
  color: #f59e0b;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.precos {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.favoritar {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.4rem;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>

