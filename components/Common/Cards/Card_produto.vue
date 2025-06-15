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
          <span class="estrelas flex items-center gap-1 text-yellow-500">
            <Icon name="mdi:star" class="w-4 h-4" /> {{ formatarNumero(avaliacao) }}
          </span>
          <span class="total-avaliacoes text-sm text-gray-500" v-if="totalAvaliacoes">
            ({{ totalAvaliacoes }})
          </span>
        </div>
      </div>
    </NuxtLink>

    <!-- Botão Favoritar -->
    <div class="wrapper-favoritar">
      <BotaoFavoritar :produtoId="produto.id">
        <template #icon>
          <Icon name="mdi:heart-outline" class="w-5 h-5 text-red-500 hover:text-red-600 transition" />
        </template>
      </BotaoFavoritar>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BotaoFavoritar from '~/components/Produto/botaofavoritar.vue'

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

const precoAtual = computed(() => {
  if (!props.produto.precos || props.produto.precos.length === 0) return 0
  return parseFloat(props.produto.precos.at(-1).preco)
})

function formatarNumero(valor) {
  return typeof valor === 'number' ? valor.toFixed(1).replace('.', ',') : '0,0'
}

function formatarPreco(valor) {
  if (typeof valor !== 'number') return '0,00'
  return valor.toFixed(2).replace('.', ',')
}
</script>

<style scoped>
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
  position: relative;
  margin-top: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-produto:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.card-produto-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  width: 100%;
}

.produto-nome {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.precos {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.avaliacao {
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.wrapper-favoritar {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

/* Responsividade */
@media (max-width: 640px) {
  .card-produto {
    padding: 16px;
    max-width: 100%;
    border-radius: 12px;
  }

  .produto-img {
    max-height: 160px;
  }

  .produto-info {
    width: 100%;
  }

  .produto-nome {
    font-size: 1rem;
  }

  .precos {
    font-size: 0.85rem;
  }

  .avaliacao {
    font-size: 0.9rem;
  }

  .wrapper-favoritar {
    top: 10px;
    right: 10px;
  }
}
</style>