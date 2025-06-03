<template>
  <div class="min-h-screen bg-white py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Título -->
      <h1
        class="text-5xl font-extrabold text-gray-900 mb-16 font-sans tracking-tight flex items-center gap-4"
      >
        <span>Categoria:</span>
        <span class="text-indigo-600 border-b-4 border-indigo-400 pb-1">
          {{ nomeCategoria }}
        </span>
      </h1>

      <!-- Filtros superiores -->
      <div class="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-12">
        <!-- Marca -->
        <select
          v-model="filtroMarca"
          class="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none"
        >
          <option value="">MARCA</option>
          <option v-for="marca in marcasDisponiveis" :key="marca" :value="marca">
            {{ marca }}
          </option>
        </select>

        <!-- Ordenação -->
        <select
          v-model="criterioOrdenacao"
          class="border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none"
        >
          <option value="relevancia">ORDENAR POR: Relevância</option>
          <option value="preco-asc">Menor preço</option>
          <option value="preco-desc">Maior preço</option>
        </select>

        <!-- Faixa de Preço -->
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model.number="precoMin"
            placeholder="Preço Mín"
            class="w-24 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
          />
          <span>-</span>
          <input
            type="number"
            v-model.number="precoMax"
            placeholder="Preço Máx"
            class="w-24 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
          />
        </div>

        <!-- Botão limpar -->
        <button
          @click="limparFiltros"
          class="text-indigo-600 hover:text-indigo-800 underline text-sm"
        >
          Limpar filtros
        </button>
      </div>

      <!-- Grid dos Produtos -->
      <div
        v-if="produtosFiltradosOrdenados.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12"
      >
        <Card_produto
          v-for="produto in produtosFiltradosOrdenados"
          :key="produto.id"
          :id="produto.id"
          :imagem="produto.imagem"
          :nome="produto.nome"
          :precoVista="produto.precoVista"
          :parcelas="produto.parcelas"
          :avaliacao="produto.avaliacao"
          :totalAvaliacoes="produto.totalAvaliacoes"
          :favoritado="produto.favoritado"
          class="rounded-xl border border-gray-200 hover:border-indigo-500 transition-colors duration-300 cursor-pointer"
        />
      </div>

      <!-- Mensagem sem produtos -->
      <div
        v-else
        class="mt-28 text-center text-gray-400 italic text-lg font-medium flex flex-col items-center gap-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-20 h-20 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 16h-1v-4h-1m2 0h-1v4h-1m6 0v-4a3 3 0 00-3-3H8a3 3 0 00-3 3v4m14 0h-1m-4-4v4m0-4v4m0-4v4"
          />
        </svg>
        Nenhum produto encontrado para esta categoria.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import Card_produto from "@/components/Common/Cards/Card_produto.vue";

const produtos = [
  {
    id: 1,
    imagem: "/imagens/notebook.jpg",
    nome: "Notebook Acer",
    precoVista: 2499.9,
    parcelas: 10,
    avaliacao: 4.7,
    totalAvaliacoes: 320,
    favoritado: false,
    categoria: "informatica",
    marca: "Acer",
  },
  {
    id: 2,
    imagem: "/imagens/fone.jpg",
    nome: "Fone Bluetooth JBL",
    precoVista: 199.99,
    parcelas: 6,
    avaliacao: 4.5,
    totalAvaliacoes: 120,
    favoritado: false,
    categoria: "eletronico",
    marca: "JBL",
  },
  {
    id: 3,
    imagem: "/imagens/shampoo.jpg",
    nome: "Shampoo Natural",
    precoVista: 39.99,
    parcelas: 4,
    avaliacao: 4.2,
    totalAvaliacoes: 90,
    favoritado: false,
    categoria: "saude",
    marca: "BioVita",
  },
  {
    id: 4,
    imagem: "/imagens/teclado.jpg",
    nome: "Teclado Logitech",
    precoVista: 299.99,
    parcelas: 6,
    avaliacao: 4.6,
    totalAvaliacoes: 150,
    favoritado: false,
    categoria: "informatica",
    marca: "Logitech",
  },
];

const route = useRoute();
const slug = route.params.slug;

const filtroMarca = ref("");
const criterioOrdenacao = ref("relevancia");
const precoMin = ref(null);
const precoMax = ref(null);
const nomeCategoria = ref("");

// Lista marcas únicas com base na categoria
const marcasDisponiveis = computed(() => {
  return [...new Set(produtosFiltrados.value.map((p) => p.marca))];
});

// Filtro inicial pela categoria
const produtosFiltrados = computed(() =>
  produtos.filter((p) => p.categoria === slug)
);

// Filtro adicional por marca
const produtosFiltradosPorMarca = computed(() => {
  if (filtroMarca.value) {
    return produtosFiltrados.value.filter((p) => p.marca === filtroMarca.value);
  }
  return produtosFiltrados.value;
});

// Filtro por faixa de preço
const produtosFiltradosPorPreco = computed(() => {
  return produtosFiltradosPorMarca.value.filter((p) => {
    const dentroMin = precoMin.value ? p.precoVista >= precoMin.value : true;
    const dentroMax = precoMax.value ? p.precoVista <= precoMax.value : true;
    return dentroMin && dentroMax;
  });
});

// Ordenação
const produtosFiltradosOrdenados = computed(() => {
  const lista = [...produtosFiltradosPorPreco.value];
  if (criterioOrdenacao.value === "preco-asc") {
    return lista.sort((a, b) => a.precoVista - b.precoVista);
  }
  if (criterioOrdenacao.value === "preco-desc") {
    return lista.sort((a, b) => b.precoVista - a.precoVista);
  }
  // Relevância
  return lista.sort(
    (a, b) => b.avaliacao * b.totalAvaliacoes - a.avaliacao * a.totalAvaliacoes
  );
});

// Função limpar filtros
const limparFiltros = () => {
  filtroMarca.value = "";
  criterioOrdenacao.value = "relevancia";
  precoMin.value = null;
  precoMax.value = null;
};

onMounted(() => {
  if (produtosFiltrados.value.length > 0) {
    const nome = produtosFiltrados.value[0].categoria;
    nomeCategoria.value = nome.charAt(0).toUpperCase() + nome.slice(1);
  } else {
    nomeCategoria.value = "Categoria não encontrada";
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap");

h1 {
  font-family: "Inter", sans-serif;
}
</style>




