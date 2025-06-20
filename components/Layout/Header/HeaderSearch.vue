<template>
  <div class="Search" @click.stop>
    <input
      placeholder="Search..."
      v-model="searchQuery"
      @input="onSearchInput"
      @keyup.enter="handleSearch"
      @focus="showResults = true"
    />
    <Botao
      icone="material-symbols:search"
      size="icon"
      sizeIcon="sm"
      cor="secondary"
      @click="handleSearch"
    />

    <!-- Resultados da busca -->
    <div v-if="showResults && searchData?.produtos?.length" class="search-results">
      <div
        v-for="produto in searchData.produtos"
        :key="produto.id"
        class="result-item"
        @click="navigateToProduct(produto.id)"
      >
        <img
          :src="produto.imagem || '/images/placeholder-product.png'"
          :alt="produto.nome"
          class="product-image"
        />
        <span class="product-name">{{ produto.nome }}</span>
      </div>
    </div>

    <!-- Estados de loading e empty -->
    <div v-if="showResults && isSearching" class="search-status">
      <LoadingSpinner size="sm" />
    </div>
    
    <div v-if="showResults && searchQuery && !isSearching && !searchData?.produtos?.length" class="no-results">
      Nenhum produto encontrado para "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup>
import Botao from '~/components/Common/botao.vue'

const searchQuery = ref('')
const showResults = ref(false)
const router = useRouter()

// Dados reativos
const searchData = ref(null)
const isSearching = ref(false)
let timeoutId

// Função de busca
const performSearch = async (query) => {
  if (query.trim().length < 2) {
    searchData.value = null
    return
  }

  isSearching.value = true
  try {
    const response = await $fetch('https://api.promohawk.com.br/api/produto/search', {
      params: { query },
    })
    searchData.value = response
  } catch (err) {
    console.error('Erro na busca:', err)
    searchData.value = { produtos: [] }
  } finally {
    isSearching.value = false
  }
}

// Debounce e trigger da busca
const onSearchInput = () => {
  clearTimeout(timeoutId)
  showResults.value = searchQuery.value.length > 0
  timeoutId = setTimeout(() => {
    performSearch(searchQuery.value)
  }, 300)
}

// Função principal de navegação
const handleSearch = async () => {
  const query = searchQuery.value.trim()
  if (!query) return

  // Busca sempre antes de decidir o redirecionamento
  await performSearch(query)

  const produtoExato = searchData.value?.produtos?.find(
    p => p.nome.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') ===
         query.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  )

  if (produtoExato) {
    navigateToProduct(produtoExato.id)
  } else {
    navigateToSearchResults()
  }
}

// Navega para a página de resultados
const navigateToSearchResults = () => {
  router.push({
    path: '/lista',
    query: { 
      tipo: 'produto',
      search: searchQuery.value 
    }
  })
  showResults.value = false
}

// Navegação ao clicar em um resultado
const navigateToProduct = (id) => {
  router.push(`/produto/${id}`)
  showResults.value = false
  searchQuery.value = ''
}

// Fechar resultados ao clicar fora
const handleClickOutside = (event) => {
  if (!event.target.closest('.Search')) {
    showResults.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* Seus estilos existentes */
.Search {
  position: relative;
  display: flex;
  align-items: center;
  background: #d3d3d3;
  border-radius: 50px;
  padding: 10px 10px 10px 15px;
  gap: 40px;
  width: 330px;
  height: 40px;
}

input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 18px;
  outline: none;
}

input::placeholder {
  color: #727272;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 8px;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: #f5f5f5;
}

.product-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

.product-name {
  font-size: 14px;
  color: #333;
}

.no-results, .search-status {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #666;
  font-size: 14px;
  margin-top: 8px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>