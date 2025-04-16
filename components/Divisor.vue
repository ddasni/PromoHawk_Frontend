<template>
  <div class="divisor">
    <h2 class="titulo">{{ titulo }}</h2>
    <div class="linha"></div>
    <NuxtLink :to="link" class="action">
        {{ actionTexto }}
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
    titulo: String,
    actionTexto: String,
    link: String
})
</script>

<style scoped>
.divisor {
    display: flex;
    max-width: 1000px;
    align-items: center;
    gap: 0.5rem;
    margin: 1.5rem 0;
}

.titulo {
    white-space: nowrap;
    font-weight: bold;
}

.linha {
    flex: 1;
    height: 1px;
    width: 1000px;
    background-color: #777777;
}

.action {
    white-space: nowrap;
    font-size: 0.9rem;
    color: #b6b6b6;
    text-decoration: none;
}

.action:hover {
    text-decoration: underline;
}
</style>