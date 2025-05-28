<template>
  <div v-if="produto" class="pagina-produto">
    <div class="topo">
      <ImagemCarousel :images="[produto.imagem,]"/>
      
      <div class="info">
        <h1 class="nome-produto">{{ produto.nome }}</h1>
        <p class="avaliacao">⭐ {{ avaliacao.toFixed(1) }} ({{ totalAvaliacoes }} avaliações)</p>
        <p class="menor-preco">menor preço via Amazon</p>
        <p class="preco-vista">R$ {{ formatarNumero(precoAtual) }} à vista</p>
        <p class="parcelamento">{{ parcelas }}x de R$ {{ formatarNumero(precoAtual / parcelas) }} sem juros</p>
        <button class="botao-ver-opcoes">Ver opções de compra</button>
        <button class="favoritar" @click.stop.prevent="toggleFavorito">
          {{ favoritado ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>

    <div class="grafico-preco">
      <div class="cabecalho-grafico">
        <h2>Histórico de Preços</h2>
        <div class="periodo">
          <button>3 Meses</button>
          <button>6 Meses</button>
          <button>1 Ano</button>
        </div>
      </div>
      <canvas ref="graficoCanvas" height="200"></canvas>
    </div>

    <div class="preco-loja">
      <h3>Melhor Preço</h3>
      <div class="card-loja">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
        <p><strong>R$ {{ formatarNumero(precoAtual) }}</strong> à vista</p>
        <button class="botao-ir-loja">Ir à loja</button>
      </div>
    </div>

    <div class="avaliacoes">
      <h3>Avaliação dos usuários</h3>
      <div class="nota-media">
        <strong>{{ avaliacao.toFixed(1) }}</strong>
        <span>({{ totalAvaliacoes }} reviews)</span>
      </div>
      <div class="barras">
        <div v-for="estrela in 5" :key="estrela" class="barra-avaliacao">
          <span>{{ estrela }} estrela</span>
          <div class="barra">
            <div class="preenchida" :style="{ width: `${(totalAvaliacoes / 5) * estrela / totalAvaliacoes * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="carregando">
    Carregando produto...
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ImagemCarousel from '~/components/Produto/Imagem.vue'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

const { id } = useRoute().params
const produto = ref(null)
const favoritado = ref(false)
const graficoCanvas = ref(null)
const avaliacao = ref(4.5)
const totalAvaliacoes = ref(0)
const parcelas = ref(10)

// Configuração da API
const config = useRuntimeConfig()

// Busca os dados do produto
const { data, pending, error } = await useFetch(`https://api.promohawk.com.br/api/produto/${id}`, {
  onResponse({ response }) {
    if (response._data) {
      produto.value = response._data.produto
      if (produto.value.precos && produto.value.precos.length > 0) {
        // Ordena os preços por data (mais recente primeiro)
        produto.value.precos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        atualizarGrafico()
      }
    }
  },
  onError(error) {
    console.error('Erro ao buscar produto:', error)
  }
})

const precoAtual = computed(() => {
  if (!produto.value?.precos || produto.value.precos.length === 0) return 0
  return parseFloat(produto.value.precos[produto.value.precos.length - 1].preco)
})

function formatarNumero(valor) {
  return typeof valor === 'number' ? valor.toFixed(2).replace('.', ',') : '0,00'
}

function toggleFavorito() {
  favoritado.value = !favoritado.value
}

// Dados fictícios para o gráfico
const dadosPrecos = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
  datasets: [{
    label: 'Preço (R$)',
    data: [precoAtual.value * 1.1, precoAtual.value * 1.05, precoAtual.value * 1.02, precoAtual.value, precoAtual.value * 0.98],
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#3b82f6',
    borderWidth: 2,
    fill: true,
    tension: 0.3
  }]
}

onMounted(() => {
  if (graficoCanvas.value) {
    new Chart(graficoCanvas.value, {
      type: 'line',
      data: dadosPrecos,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return `R$ ${value.toFixed(2).replace('.', ',')}`
              }
            }
          }
        }
      }
    })
  }
})

definePageMeta({
  layout: 'default'
})
</script>


<style scoped>
.pagina-produto {
  padding: 40px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
}

.topo {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 40px;
}

.imagens-laterais {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.miniatura {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.imagem-produto-principal {
  width: 300px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  background-color: #f3f4f6;
}

.nome-produto{
  color: black;
  font-size: 1.6rem;
}

.info {
  flex: 1;
}

.avaliacao {
  font-size: 1.1rem;
  color: #f59e0b;
}

.menor-preco {
  color: #10b981;
  font-size: 0.9rem;
}

.preco-vista {
  font-size: 1.5rem;
  color: #10b981;
  font-weight: bold;
}

.parcelamento {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.botao-ver-opcoes {
  background-color: #10b981;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
}

.botao-favorito {
  background: transparent;
  border: 2px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  font-size: 1.4rem;
  
}

.grafico-preco {
  margin-top: 40px;
}

.cabecalho-grafico {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.periodo button {
  margin-left: 8px;
  background-color: #e5e7eb;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.preco-loja {
  margin-top: 40px;
}

.card-loja {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.card-loja img {
  height: 40px;
}

.botao-ir-loja {
  margin-left: auto;
  background-color: #0f766e;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.avaliacoes {
  margin-top: 40px;
}

.nota-media {
  font-size: 2rem;
  font-weight: bold;
}

.barras {
  margin-top: 10px;
}

.barra-avaliacao {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.barra {
  flex: 1;
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.preenchida {
  background: #f59e0b;
  height: 100%;
}

.comentarios {
  margin-top: 40px;
}

.comentario {
  background: #f3f4f6;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: zoom-out;
}

.imagem-modal {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
}

.miniaturas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.miniatura {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s;
}

.miniatura:hover {
  border-color: #3b82f6;
}

</style>




