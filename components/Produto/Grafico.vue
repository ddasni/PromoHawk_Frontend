<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useFetch } from '#app' // Nuxt 3

interface PrecoItem {
  id: number
  produto_id: number
  loja_id: number
  preco: number
  created_at: string
  updated_at: string
}

interface ProdutoApiResponse {
  status: boolean
  produto: {
    id: number
    nome: string
    precos: PrecoItem[]
  }
}

interface ChartEntry {
  date: string
  amount: number
}

const props = defineProps<{
  produtoId: number
}>()

const chartData = ref<ChartEntry[]>([])

watchEffect(async () => {
  if (!props.produtoId) return

  const { data } = await useFetch<ProdutoApiResponse>(
    `https://api.promohawk.com.br/api/produto/${props.produtoId}`
  )

  if (data.value?.produto?.precos) {
    chartData.value = data.value.produto.precos.map(item => {
      const date = new Date(item.created_at)
      return {
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        amount:(item.preco)
      }
    })
  }
})

const categories = {
  amount: {
    name: 'Valor Registrado',
    color: '#22c55e'
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const menorPreco = computed(() => {
  if (!chartData.value.length) return null
  const menor = Math.min(...chartData.value.map(item => item.amount))
  return formatCurrency(menor)
})
</script>

<template>
  <UContainer class="container-flex" :ui="{ base: 'max-w-screen-xl' }">
    <div class="mx-auto max-w-xl py-8">
      <UCard class="bg-(--ui-bg)">
        <template #header>
          <div class="space-y-1">
            <h3 class="text-sm text-(--ui-text-muted)">Menor Preço Registrado</h3>
            <h2 class="text-2xl font-medium">
              {{ menorPreco || 'Carregando...' }}
            </h2>
          </div>
        </template>

        <AreaChart
          :data="chartData"
          x="date"
          :height="180"
          :categories="categories"
          y-axis="['amount']"
          :y-num-ticks="2"
          :curve-type="CurveType.Basis"
          :legend-position="LegendPosition.Top"
          :y-formatter="formatCurrency"
        />
      </UCard>
    </div>
    <div class="melhor-preco">
        <div class="titulo">
          <h3>Melhor Preço</h3>
        </div>
        <div class="loja">
          <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"/>
          <p><strong>R$ 1.200</strong> à vista</p>  <!--{{ precoAtual }}-->
        </div>
        <NuxtLink to="">ir à loja</NuxtLink>
    </div>
  </UContainer> 
</template>

<style scoped>
.container-flex {
  display: flex;
  align-items: flex-start; /* ou center, conforme desejado */
  gap: 1rem; /* espaço entre o gráfico e a loja */
}

.melhor-preco {
  width: 300px;
  height: 250px;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe,
             -15px -15px 30px #ffffff;
}

.titulo{
  align-items: flex-start;
  background-color: aqua;
  color: black;
  max-width: 115px;
  border-radius: 15px 0px;
  text-align: center;
}

.loja{
  color: black;
  margin: 5%;
  flex-wrap: nowrap;
  flex-direction: row;
}

.logo{
  display: inline-block;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: contain;
  background-color: #ffffff;
}
</style>