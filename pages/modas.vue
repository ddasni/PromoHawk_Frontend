<template>
  <div class="catalogo">
    <CardProduto
      imagem="https://via.placeholder.com/300x200?text=Tenis"
      nome="Tênis Esportivo"
      :precoAtual="199.9"
      :precoOriginal="249.9"
    />
    <CardProduto
      imagem="https://via.placeholder.com/300x200?text=Camisa"
      nome="Camisa Casual"
      :precoAtual="89.9"
    />
    <CardProduto
      imagem="https://via.placeholder.com/300x200?text=Relogio"
      nome="Relógio Digital"
      :precoAtual="299.99"
      :precoOriginal="349.99"
    />
    <CardProduto
      imagem="https://via.placeholder.com/300x200?text=Jaqueta"
      nome="Jaqueta Jeans"
      :precoAtual="159.9"
    />
  </div>
</template>

<script setup>
import CardProduto from '@/components/Common/Cards/Card_produto.vue'
</script>

<style scoped>
.catalogo {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 80px 20px 40px;
  background-color: #ffffff;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
