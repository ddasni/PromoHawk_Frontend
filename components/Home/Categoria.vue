<script setup lang="ts">
defineProps<{
  categoria: {
    id: number
    nome: string
    imagem: string
  }
}>()
</script>

<template>
  <NuxtLink :to="`/categoria/${categoria.id}`" class="card">
    <div class="image-wrapper">
      <img class="imagem" :src="categoria.imagem" alt="Imagem da categoria" />
    </div>
    <p class="title">{{ categoria.nome }}</p>
  </NuxtLink>
</template>

<style scoped>
.card {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
}

.image-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms;
}

.image-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.20);
}

.imagem {
  width: 80%;
  height: 80%;
  object-fit: cover;
}

.title {
  margin-top: 8px;
  font-size: clamp(12px, 2vw, 14px);
  color: #000;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

</style>