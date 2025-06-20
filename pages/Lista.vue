<template>
  <div class="min-h-screen bg-white py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Título -->
    <h1 class="text-5xl font-extrabold text-gray-900 mb-4 font-sans tracking-tight flex items-center gap-4 capitalize">
      <span>{{ tituloPlural }}</span>
    </h1>
    <h2 class="text-xl text-gray-600 mb-12">
      Exibindo todos os <span class="font-semibold text-gray-800">{{ tituloPlural }}</span> disponíveis para você.
    </h2>

    <!-- Filtros (somente para produtos) -->
    <div
      v-if="tipo === 'produto'"
      class="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-12"
    >
      <select
        v-model="filtroMarca"
        class="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none"
      >
        <option value="">MARCA</option>
        <option v-for="marca in marcasDisponiveis" :key="marca" :value="marca">{{ marca }}</option>
      </select>

      <select
        v-model="criterioOrdenacao"
        class="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none"
      >
        <option value="relevancia">ORDENAR POR: Relevância</option>
        <option value="preco-asc">Menor preço</option>
        <option value="preco-desc">Maior preço</option>
      </select>

      <div class="flex items-center gap-2">
        <input
          type="number"
          v-model.number="precoMin"
          placeholder="Preço Mín"
          class="w-28 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
        />
        <span>-</span>
        <input
          type="number"
          v-model.number="precoMax"
          placeholder="Preço Máx"
          class="w-28 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
        />
      </div>

      <button
        @click="limparFiltros"
        class="text-indigo-600 hover:text-indigo-800 underline text-sm"
      >
        Limpar filtros
      </button>
    </div>

      <!-- Produtos -->
      <div v-if="tipo === 'produto'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        <Produto
          v-for="item in dados"
          :key="item.id"
          :produto="item"
          :imagem="item.imagens?.[0] || '/img/sem-imagem.png'"
          :avaliacao="item.media_avaliacao || 0"
          :totalAvaliacoes="item.total_avaliacoes || 0"
          :favoritado="false"
        />
      </div>

      <!-- Categorias -->
      <div v-else-if="tipo === 'categoria'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
        <Categoria
          v-for="item in dados"
          :key="item.id"
          :categoria="item"
        />
      </div>

      <!-- Lojas -->
      <div v-else-if="tipo === 'loja'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
        <Loja
          v-for="item in dados"
          :key="item.id"
          :loja="item"
        />
      </div>

      <!-- Tipo inválido ou vazio -->
      <div v-else class="mt-28 text-center text-red-500 text-xl font-medium">
        Tipo inválido. Use ?tipo=produto, cupom, categoria ou loja.
      </div>

      <!-- Nenhum resultado -->
      <div v-if="dados.length === 0" class="mt-28 text-center text-gray-400 italic text-lg font-medium flex flex-col items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m2 0h-1v4h-1m6 0v-4a3 3 0 00-3-3H8a3 3 0 00-3 3v4m14 0h-1m-4-4v4m0-4v4m0-4v4" />
        </svg>
        Nenhum item encontrado.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

// Componentes
import Produto from '~/components/Common/Cards/Card_produto.vue'
import Categoria from '~/components/Home/Categoria.vue'
import Loja from '~/components/Lista/loja.vue'

const route = useRoute()
const tipo = ref(route.query.tipo?.toString() || '')
const dados = ref([])

const filtroMarca = ref("")
const criterioOrdenacao = ref("relevancia")
const precoMin = ref(null)
const precoMax = ref(null)

const limparFiltros = () => {
  filtroMarca.value = ""
  criterioOrdenacao.value = "relevancia"
  precoMin.value = null
  precoMax.value = null
}

// Pluralização simples
const tituloPlural = computed(() => {
  if (tipo.value === "produto") return "Produtos"
  if (tipo.value === "categoria") return "Categorias"
  if (tipo.value === "loja") return "Lojas"
  return tipo.value.charAt(0).toUpperCase() + tipo.value.slice(1) + "s"
})

// Marcas disponíveis para filtro
const marcasDisponiveis = computed(() => {
  if (tipo.value !== "produto") return []
  return [...new Set(dados.value.map((p) => p.loja?.nome).filter(Boolean))]
})

watchEffect(async () => {
  if (!tipo.value) return

  try {
    let url = `https://api.promohawk.com.br/api/${tipo.value}`
    const queryParams = {}

    // Se for busca com texto
    if (route.query.search && tipo.value === 'produto') {
      url += '/search'
      queryParams.query = route.query.search

      const { data } = await useFetch(url, { params: queryParams })

      const produtosSimples = data.value?.produtos || []

      // Buscar detalhes para cada produto
      const resultadosDetalhados = await Promise.all(
        produtosSimples.map(async (produto) => {
          try {
            const detalhe = await $fetch(`https://api.promohawk.com.br/api/produto/${produto.id}`)
            return detalhe?.produto || null
          } catch (e) {
            console.error(`Erro ao buscar detalhes do produto ${produto.id}`, e)
            return null
          }
        })
      )

      dados.value = resultadosDetalhados.filter(Boolean)
      return
    }

    // Caso não seja pesquisa, uso padrão
    const { data } = await useFetch(url)
    const mapTipoParaChave = {
      produto: 'produtos',
      categoria: 'categorias',
      cupom: 'cupons',
      loja: 'lojas'
    }

    const chave = mapTipoParaChave[tipo.value]
    dados.value = Array.isArray(data.value?.[chave]) ? data.value[chave] : []

  } catch (err) {
    console.error('Erro ao buscar dados:', err)
    dados.value = []
  }
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap");

h1 {
  font-family: "Inter", sans-serif;
}
</style>