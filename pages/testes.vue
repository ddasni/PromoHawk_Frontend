<template>
  <h1>Teste de requisição com Async Data</h1>
  <div class="container">
    <button @click="refresh">Recarregar dados</button>

    <div v-if="pending">Carregando...</div>
    <div v-else-if="error">Erro: {{ error.message }}</div>

    <pre v-else>
      {{ produto }}
    </pre>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "basic",
});

const {
  data: produto,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "produto-info",
  async () => {
    const [produtoData] = await Promise.all([
      $fetch(`https://srv809082.hstgr.cloud/htdocs/PromoHawkDB_API/produto/consultar`)
    ]);

    return {
      id: produtoData.idProduto,
      name: produtoData.nomeProduto,
      preco: produtoData.precoProduto
    };
  }
);
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
