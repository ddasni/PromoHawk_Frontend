<template>
  <div v-if="produto" class="pagina-produto">
    <div class="topo">
      
      <ImagemCarousel :images="[
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.wired.com%2Fphotos%2F5fa5dc3dba670daaf8e97a8d%2Fmaster%2Fw_2560%252Cc_limit%2Fgames_gear_series-x.jpg&f=1&nofb=1&ipt=9ee63791efb694bab17d82f35480d2123ae99402bfc5fda962f301c94d912653',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2F6F3Vg5ah8vbS83GSikcND3.jpg&f=1&nofb=1&ipt=97fd8fac8d06415f86cb11f5891fcd076b15b0c8b880a6add70384c163b2d379',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgizmodo.uol.com.br%2Fwp-content%2Fblogs.dir%2F8%2Ffiles%2F2019%2F12%2Fxbox-series-x-970x546.jpg&f=1&nofb=1&ipt=3f20ef9e6fe23b8ca7fff45fcbac3dc1b383178016bb4dd3e6eadfe0a2755882',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lendagames.com%2Fwp-content%2Fuploads%2F2020%2F03%2FASSET-XBOX-SERIES-X-SPECS.jpg&f=1&nofb=1&ipt=62b9c74231541dac306c6e20e5e381baf17d12981aabb9bd1aff8661657ca3bd',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.zst.com.br%2Fcms-assets%2F2020%2F11%2Fxbox-series-x-traseira.jpg&f=1&nofb=1&ipt=cd347db7f3274cfc4211d745b0c7580819b9f37b68d9272b067f98bfd62ff198'
        ]" 
      />
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="avaliacao">⭐ {{ produto.avaliacao.toFixed(1) }} ({{ produto.totalAvaliacoes }} avaliações)</p>
        <p class="menor-preco">menor preço via Amazon</p>
        <p class="preco-vista">R$ {{ formatarNumero(produto.precoVista) }} à vista</p>
        <p class="parcelamento">{{ produto.parcelas }}x de R$ {{ formatarNumero(produto.precoVista / produto.parcelas) }} sem juros</p>
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
        <p><strong>R$ {{ formatarNumero(produto.precoVista) }}</strong> à vista</p>
        <button class="botao-ir-loja">Ir à loja</button>
      </div>
    </div>

    <div class="avaliacoes">
      <h3>Avaliação dos usuários</h3>
      <div class="nota-media">
        <strong>{{ produto.avaliacao.toFixed(1) }}</strong>
        <span>({{ produto.totalAvaliacoes }} reviews)</span>
      </div>
      <div class="barras">
        <div v-for="estrela in 5" :key="estrela" class="barra-avaliacao">
          <span>{{ estrela }} estrela</span>
          <div class="barra">
            <div class="preenchida" :style="{ width: `${(produto.totalAvaliacoes / 5) * estrela / produto.totalAvaliacoes * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="comentarios">
      <h3>O que dizem sobre este produto</h3>
      <div v-for="(comentario, index) in produto.comentarios" :key="index" class="comentario">
        <p><strong>{{ comentario.usuario }}</strong> — ⭐ {{ comentario.nota }}</p>
        <p>{{ comentario.texto }}</p>
      </div>
    </div>
  </div>

  <div v-else class="carregando">
    Carregando produto...
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
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
  Filler  // <-- IMPORTANTE
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
  Filler // <-- REGISTRA AQUI
)

const imagemModal = ref(null)

function abrirModal(src) {
  imagemModal.value = src
}

import s25UltraImage from '~/assets/images/Produtos/samsung/Samsung S25 ultra.png'

const produto = {
  id: '1',
  nome: 'Samsung Galaxy S25 Ultra 256GB',
  imagem: s25UltraImage,
  imagens: [
    s25UltraImage,
   
  ],
  precoVista: 4899.99,
  parcelas: 10,
  avaliacao: 4.8,
  totalAvaliacoes: 321,
  comentarios: [
    { usuario: 'João', nota: 5, texto: 'Celular excelente, muito rápido e bonito!' },
    { usuario: 'Maria', nota: 4, texto: 'Gostei bastante, mas achei a câmera um pouco exagerada.' },
    { usuario: 'Carlos', nota: 5, texto: 'Desempenho top, roda tudo no máximo!' }
  ]
}



function formatarNumero(valor) {
  return typeof valor === 'number' ? valor.toFixed(2).replace('.', ',') : '0,00'
}

const graficoCanvas = ref(null)

const dadosPrecos = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
  datasets: [{
    label: 'Preço (R$)',
    data: [5299.99, 5199.99, 4999.99, 4899.99, 4799.99], // preços fictícios
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

function toggleFavorito() {
  favoritado.value = !favoritado.value
  emit('update:favoritado', favoritado.value)
}
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




