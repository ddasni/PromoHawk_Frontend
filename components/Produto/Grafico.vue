<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useFetch } from '#app'
import Botao from "~/components/Common/botao.vue"

interface PrecoItem {
  id: number
  produto_id: number
  preco: string
  forma_pagamento: string
  parcelas: number
  valor_parcela: string
  loja_nome: string
  link: string
  data_registro: string
  data_alteração: string
  loja: {
    id: number
    nome: string
  }
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
const menorPrecoInfo = ref<PrecoItem | null>(null)

watchEffect(async () => {
  if (!props.produtoId) return

  const { data } = await useFetch<ProdutoApiResponse>(
    `https://api.promohawk.com.br/api/produto/${props.produtoId}`
  )

  const precos = data.value?.produto?.precos ?? []

  chartData.value = precos.map(item => {
    const precoFormatado = parseFloat(item.preco.replace('.', '').replace(',', '.'))

    return {
      date: item.data_registro.split(' ')[0],
      amount: precoFormatado
    }
  })

  if (precos.length > 0) {
    const ordenado = [...precos].sort((a, b) => {
      const pa= parseFloat(a.preco.replace('.', '').replace(',', '.'))

      const pb= parseFloat(b.preco.replace('.', '').replace(',', '.'))

      return pa - pb
    })
    menorPrecoInfo.value = ordenado[0]
  }
})

const parsePreco = (valor: string): number => parseFloat(valor.replace(/\./g, '').replace(',','.'))

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
              {{ menorPrecoInfo ? formatCurrency(parsePreco(menorPrecoInfo.preco)) : 'Carregando...' }}
            </h2>

            <div v-if="menorPrecoInfo" class="bg-gray-100 p-3 rounded mt-2 text-sm text-black space-y-1">
              <p><strong>Forma de pagamento:</strong> {{ menorPrecoInfo.forma_pagamento }}</p>
              <p><strong>Loja:</strong> {{ menorPrecoInfo.loja.nome }}</p>
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