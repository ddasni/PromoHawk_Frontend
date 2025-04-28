<template>
    <div class="Search">
        <input placeholder="Search..." v-model="searchQuery" />
        <Botao
            icone="material-symbols:search"
            size="icon"
            cor="secondary"
            @click="Pesquisar"/>
    </div>
</template>

<script setup>
import Botao from '~/components/Common/botao.vue'


/*
import { ref } from 'vue'
import { buscarProdutos } from ''

const searchQuery = ref('')
const produtos = ref([])

async function doSearch() {
  if (searchQuery.value.trim() === '') {
    produtos.value = []
    return
  }

  try {
    produtos.value = await buscarProdutos(searchQuery.value)
  } catch (error) {
    console.error('Erro ao buscar produtos', error)
  }
}
*/
</script>

<style scoped>

.Search {
    display: flex;
    align-items: center;
    background: #d3d3d3; /* cor cinza claro */
    border-radius: 50px;
    padding: 10px 20px;
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
  color: rgb(114, 114, 114);
}
</style>