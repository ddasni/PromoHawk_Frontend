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
  width: 100%;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: auto;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.02);
}

.image-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  background-color: #fff;
}

.image-wrapper:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.17);
}

.imagem {
  max-width: 85%;
  max-height: 85%;
  object-fit: contain;
}

.title {
  margin-top: 8px;
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  color: #000;
  text-wrap: balance;
  max-width: 100%;
  word-break: break-word;
}

/* Responsividade */
@media (max-width: 640px) {
  .card {
    max-width: 120px;
  }

  .image-wrapper {
    width: 80px;
    height: 80px;
  }

  .imagem {
    width: 85%;
    height: 85%;
  }
}

@media (max-width: 480px) {
  .card {
    max-width: 100px;
  }

  .image-wrapper {
    width: 70px;
    height: 70px;
  }

  .title {
    font-size: 0.75rem;
  }
}
</style>