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
  data_alteracao: string
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

  // Encontrar o menor preço
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
</script>

<template>
  <UContainer class="flex items-start gap-4" :ui="{ base: 'max-w-screen-xl' }">
    <div class="mx-auto w-full sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem]">
      <UCard class="bg-(--ui-bg)">
         <template #header>
            <div class="flex justify-between items-start">
              <div>
                <p class="text-md text-gray-400 font-medium">Menor Preço Registrado</p>
                <h2 class="text-xl font-bold text-white">
                  {{ menorPrecoInfo ? formatCurrency(parsePreco(menorPrecoInfo.preco)) : 'Carregando...' }}
                  <span v-if="menorPrecoInfo" class="text-sm font-normal text-gray-300">
                    na {{ menorPrecoInfo.loja.nome }}
                  </span>
                </h2>
                <!-- <p v-if="menorPrecoInfo" class="text-sm font-normal text-green-400">
                  {{ menorPrecoInfo.loja.nome }}
                </p> -->
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