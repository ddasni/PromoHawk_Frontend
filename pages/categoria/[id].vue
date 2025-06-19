<template>
  <div class="min-h-screen bg-white py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Título -->
      <h1 class="text-5xl font-extrabold text-gray-900 mb-4 font-sans tracking-tight flex items-center gap-4">
        <span>Produtos</span>
      </h1>
      <h2 class="text-xl text-gray-600 mb-12">
        Categoria: <span class="font-semibold text-gray-800">{{ categoriaAtual }}</span>
      </h2>

      <!-- Filtros -->
      <div class="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-12">
        <select v-model="filtroMarca" class="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none">
          <option value="">MARCA</option>
          <option v-for="marca in marcasDisponiveis" :key="marca" :value="marca">{{ marca }}</option>
        </select>

        <select v-model="criterioOrdenacao" class="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none">
          <option value="relevancia">ORDENAR POR: Relevância</option>
          <option value="preco-asc">Menor preço</option>
          <option value="preco-desc">Maior preço</option>
        </select>

        <div class="flex items-center gap-2">
          <input type="number" v-model.number="precoMin" placeholder="Preço Mín" class="w-28 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none" />
          <span>-</span>
          <input type="number" v-model.number="precoMax" placeholder="Preço Máx" class="w-28 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none" />
        </div>

        <button @click="limparFiltros" class="text-indigo-600 hover:text-indigo-800 underline text-sm">
          Limpar filtros
        </button>
      </div>

      <!-- Grid dos Produtos -->
      <div v-if="produtosFiltradosOrdenados.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12">
        <Produto
          v-for="produto in produtosFiltradosOrdenados"
          :key="produto.id"
          :produto="produto"
          :imagem="produto.imagens?.[0] || '/img/sem-imagem.png'"
          :avaliacao="produto.media_nota || 0"
          :totalAvaliacoes="produto.reviews?.length || 0"
          :favoritado="false"
        />
      </div>

      <!-- Nenhum produto -->
      <div v-else class="mt-28 text-center text-gray-400 italic text-lg font-medium flex flex-col items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m2 0h-1v4h-1m6 0v-4a3 3 0 00-3-3H8a3 3 0 00-3 3v4m14 0h-1m-4-4v4m0-4v4m0-4v4" />
        </svg>
        Nenhum produto encontrado.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import Produto from "~/components/Common/Cards/Card_produto.vue";

const route = useRoute();
const categoriaId = ref(route.params.id);

// Filtros
const filtroMarca = ref("");
const criterioOrdenacao = ref("relevancia");
const precoMin = ref(null);
const precoMax = ref(null);

// Buscar categoria
const { data: categoriaData, error: categoriaError } = await useFetch(
  `https://api.promohawk.com.br/api/categoria/${categoriaId.value}`,
  {
    onError(error) {
      console.error("Erro ao buscar categoria:", error);
    },
  }
);

// Computado corrigido para exibir nome da categoria
const categoriaAtual = computed(() => {
  try {
    console.log("Estrutura da categoria:", JSON.stringify(categoriaData.value, null, 2));
  } catch (e) {
    console.warn("Erro ao mostrar categoria:", e);
  }

  if (categoriaError.value) return "Erro ao carregar";

  return (
    categoriaData.value?.data?.nome ||
    categoriaData.value?.categoria?.nome ||
    categoriaData.value?.nome ||
    "Desconhecida"
  );
});

onMounted(() => {
  console.log("ID da categoria:", categoriaId.value);
  console.log("Dados da categoria:", categoriaData.value);
});

// Buscar produtos
const { data: produtosData, error: errorProdutos } = await useFetch(
  `https://api.promohawk.com.br/api/produto`,
  {
    onError(error) {
      console.error("Erro ao buscar produtos:", error);
    },
  }
);

// Produtos direto da resposta da categoria
const produtos = computed(() => {
  if (categoriaError.value || !categoriaData.value) return [];
  return categoriaData.value.categoria?.produtos || [];
});

// Produtos válidos
const produtosValidos = computed(() => {
  return produtos.value.filter((p) => p && p.id && p.nome);
});

// Marcas disponíveis
const marcasDisponiveis = computed(() => {
  const marcas = produtosValidos.value.map((p) => {
    if (p.link) {
      const domain = p.link.split("/")[2];
      if (domain.includes("amazon.")) return "Amazon";
      if (domain.includes("magazineluiza.")) return "Magazine Luiza";
      if (domain.includes("americanas.")) return "Americanas";
      if (domain.includes("pichau.")) return "Pichau";
      if (domain.includes("samsung.")) return "Samsung";
      if (domain.includes("lg.")) return "LG";
    }
    return p.nome.split(" ")[0];
  });

  return [...new Set(marcas)].filter(Boolean);
});

// Filtro por marca
const produtosFiltradosPorMarca = computed(() => {
  if (!filtroMarca.value) return produtosValidos.value;

  return produtosValidos.value.filter((p) => {
    const marcaProduto = p.link?.includes("amazon.")
      ? "Amazon"
      : p.link?.includes("magazineluiza.")
      ? "Magazine Luiza"
      : p.link?.includes("americanas.")
      ? "Americanas"
      : p.link?.includes("pichau.")
      ? "Pichau"
      : p.link?.includes("samsung.")
      ? "Samsung"
      : p.link?.includes("lg.")
      ? "LG"
      : p.nome.split(" ")[0];

    return marcaProduto === filtroMarca.value;
  });
});

// Filtro por preço
const produtosFiltradosPorPreco = computed(() => {
  return produtosFiltradosPorMarca.value.filter((p) => {
    const preco = p.preco || p.precos?.[0]?.preco || 0;
    const dentroMin = precoMin.value ? preco >= precoMin.value : true;
    const dentroMax = precoMax.value ? preco <= precoMax.value : true;
    return dentroMin && dentroMax;
  });
});

// Ordenação
const produtosFiltradosOrdenados = computed(() => {
  const lista = [...produtosFiltradosPorPreco.value];

  if (criterioOrdenacao.value === "preco-asc") {
    return lista.sort(
      (a, b) =>
        (a.preco || a.precos?.[0]?.preco || 0) -
        (b.preco || b.precos?.[0]?.preco || 0)
    );
  }
  if (criterioOrdenacao.value === "preco-desc") {
    return lista.sort(
      (a, b) =>
        (b.preco || b.precos?.[0]?.preco || 0) -
        (a.preco || a.precos?.[0]?.preco || 0)
    );
  }

  return lista.sort((a, b) => {
    const scoreA = (a.avaliacao || 4.5) * (a.totalAvaliacoes || 0);
    const scoreB = (b.avaliacao || 4.5) * (b.totalAvaliacoes || 0);
    return scoreB - scoreA;
  });
});

// Limpar filtros
const limparFiltros = () => {
  filtroMarca.value = "";
  criterioOrdenacao.value = "relevancia";
  precoMin.value = null;
  precoMax.value = null;
};

// Debug
watch(produtosData, (val) => {
  console.log("Produtos carregados:", val);
  console.log("Produtos filtrados:", produtos.value);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap");

h1 {
  font-family: "Inter", sans-serif;
}
</style>