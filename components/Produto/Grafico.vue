<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useFetch } from '#app'
import Botao from "~/components/Common/botao.vue"

interface PrecoItem {
  id: number
  produto_id: number
  loja_id: number
  preco: number
  forma_pagamento: string
  loja_nome: string
  link: string
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

const menorPrecoInfo = ref<PrecoItem | null>(null)

watchEffect(async () => {
  if (!props.produtoId) return

  const { data } = await useFetch<ProdutoApiResponse>(
    `https://api.promohawk.com.br/api/produto/${props.produtoId}`
  )

  if (data.value?.produto?.precos) {
    const precos = data.value.produto.precos

    chartData.value = precos.map(item => ({
      date: new Date(item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      amount: item.preco
    }))

    const menor = [...precos].sort((a, b) => a.preco - b.preco)[0]
    menorPrecoInfo.value = menor
  }
})

function irParaLoja() {
  if (menorPrecoInfo.value?.link) {
    window.open(menorPrecoInfo.value.link, '_blank')
  }
}
</script>

<template>
  <UContainer class="flex items-start gap-4" :ui="{ base: 'max-w-screen-xl' }">
    <div class="mx-auto w-full sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem]">
      <UCard class="bg-(--ui-bg)">
        <template #header>
          <div class="space-y-1">
            <h3 class="text-sm text-(--ui-text-muted)">Menor Preço Registrado</h3>
            <h2 class="text-2xl font-medium">
              {{ menorPrecoInfo ? formatCurrency(menorPrecoInfo.preco) : 'Carregando...' }}
            </h2>

            <div v-if="menorPrecoInfo" class="bg-gray-100 p-3 rounded mt-2 text-sm text-black space-y-1">
              <p><strong>Forma de pagamento:</strong> {{ menorPrecoInfo.forma_pagamento }}</p>
              <p><strong>Loja:</strong> {{ menorPrecoInfo.loja_nome }}</p>
              <Botao class="btn-link mt-2" nome="ir à loja" @click="irParaLoja" />
            </div>
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
  </UContainer> 
</template>

<style scoped>
.melhor-preco {
  width: 300px;
  height: 250px;
  border-radius: 10px;
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

.btn-link {
  width: 100%;
  padding: 12px;
  background-color: seagreen;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>