<template>
  <div v-if="produto" class="pagina-produto">
    <div class="topo">
      <img :src="produto.imagem" :alt="produto.nome" class="imagem-produto" />
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="avaliacao">⭐ {{ produto.avaliacao.toFixed(1) }} ({{ produto.totalAvaliacoes }} avaliações)</p>
        <p class="preco-vista">R$ {{ formatarNumero(produto.precoVista) }} à vista</p>
        <p class="preco-parcelado">{{ produto.parcelas }}x de R$ {{ formatarNumero(produto.precoVista / produto.parcelas) }} sem juros</p>
        <button class="botao-compra">Comprar</button>
      </div>
    </div>

    <div class="grafico-preco">
      <h2>Histórico de Preço</h2>
      <div class="grafico-avaliacoes">
        <canvas ref="graficoCanvas" height="200"></canvas>
</div>
    </div>

    <div class="comentarios">
      <h2>O que dizem sobre este produto</h2>
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

import s25UltraImage from '~/assets/images/Produtos/samsung/Samsung S25 ultra.png'

const produto = {
  id: '1',
  nome: 'Samsung Galaxy S25 Ultra 256GB',
  imagem: s25UltraImage,
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
</script>



<style scoped>
.pagina-produto {
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Segoe UI', sans-serif;
}

.topo {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.imagem-produto {
  width: 350px;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  background-color: #f3f4f6;
}

.info h1 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.avaliacao {
  color: #f59e0b;
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.preco-vista {
  font-size: 1.5rem;
  color: #10b981;
  font-weight: bold;
  margin-bottom: 6px;
}

.preco-parcelado {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 20px;
}

.botao-compra {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.grafico-preco {
  margin-top: 40px;
}

.grafico-mock {
  height: 200px;
  background: #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 10px;
  color: #4b5563;
  font-size: 1.1rem;
}

.grafico-avaliacoes {
  margin-top: 10px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
}


.comentarios {
  margin-top: 40px;
}

.comentario {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.carregando {
  text-align: center;
  padding: 80px;
  font-size: 1.2rem;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.pagina-produto {
  margin-top: 100px;
  background-color: transparent;
}

</style>




