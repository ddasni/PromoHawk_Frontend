<template>
  <NuxtLink :to="`/produto/${id}`" class="card-produto-link">
    <div class="card-produto">
      <img :src="imagem" :alt="nome" class="produto-img" />

      <div class="produto-info">
        <h2 class="produto-nome">{{ nome }}</h2>

        <div class="avaliacao">
          <span class="estrelas">⭐ {{ formatarNumero(avaliacao) }}</span>
          <span class="total-avaliacoes">({{ totalAvaliacoes }})</span>
        </div>

        <div class="precos">
          <span class="preco-vista">R$ {{ formatarNumero(precoVista) }} à vista</span>
          <span class="preco-parcelado">
            {{ parcelas }}x de R$ {{ formatarNumero(precoVista / parcelas) }} sem juros
          </span>
        </div>

        <button class="botao-compra">Ver produto</button>
      </div>

      <button class="favoritar" @click.stop.prevent="toggleFavorito">
        {{ favoritado ? '❤️' : '🤍' }}
      </button>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  id: [String, Number],
  imagem: { type: String, required: true },
  nome: { type: String, default: 'Produto desconhecido' },
  precoVista: { type: Number, default: 0 },
  parcelas: { type: Number, default: 10 },
  avaliacao: { type: Number, default: 4.5 },
  totalAvaliacoes: { type: Number, default: 0 },
  favoritado: { type: Boolean, default: false },
})

const emit = defineEmits(['update:favoritado'])
const favoritado = ref(props.favoritado)

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
  max-height: 180px;
  object-fit: contain;
  border-radius: 12px;
  background-color: #f9fafb;
}

.produto-info {
  margin-top: 16px;
  text-align: center;
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

.preco-vista {
  font-weight: 600;
  color: #10b981;
}

.botao-compra {
  background-color: #3b82f6;
  color: white;
  padding: 8px 14px;
  font-size: 0.9rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.botao-compra:hover {
  background-color: #2563eb;
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
