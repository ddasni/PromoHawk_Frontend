<template>
  <NuxtLink :to="`/produto/${produto.id}`" class="card-produto-link">
    <div class="card-produto">
      <img :src="produto.imagem" :alt="produto.nome" class="produto-img" />

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

      <button class="favoritar" @click.stop.prevent="toggleFavorito">
        {{ favoritado ? '❤️' : '🤍' }}
      </button>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  produto: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      nome: 'Produto desconhecido',
      descricao: '',
      imagem: '',
      precos: [],
      status_produto: 'inativo'
    })
  },
  avaliacao: { type: Number, default: 0 },
  totalAvaliacoes: { type: Number, default: 0 },
  favoritado: { type: Boolean, default: false },
})

const emit = defineEmits(['update:favoritado'])
const favoritado = ref(props.favoritado)

// Calcula o preço atual (último preço cadastrado)
const precoAtual = computed(() => {
  if (!props.produto.precos || props.produto.precos.length === 0) return 0
  return parseFloat(props.produto.precos[props.produto.precos.length - 1].preco)
})

// Calcula o preço anterior (penúltimo preço cadastrado, se existir)
const precoAnterior = computed(() => {
  if (!props.produto.precos || props.produto.precos.length < 2) return null
  return parseFloat(props.produto.precos[props.produto.precos.length - 2].preco)
})

watch(() => props.favoritado, (val) => {
  favoritado.value = val
})

function toggleFavorito() {
  favoritado.value = !favoritado.value
  emit('update:favoritado', favoritado.value)
}

function formatarNumero(valor) {
  return typeof valor === 'number' ? valor.toFixed(2).replace('.', ',') : '0,00'
}

function formatarPreco(valor) {
  if (typeof valor !== 'number') return '0,00'
  return valor.toFixed(2).replace('.', ',')
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
  margin-top: 24px; /* Afasta do header */
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

.produto-descricao {
  color: #6c6d6e;
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

.preco-vista {
  font-weight: 600;
  color: #10b981;
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
