<template>
  <div class="divisor">
    <h2 class="titulo">{{ titulo }}</h2>

    <div class="linha" :class="[sizeClass]"></div>

    <NuxtLink :to="link" class="action">
        {{ actionTexto }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    titulo?: string
    link?: string
    actionTexto?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    // Definições padrão do botao
    titulo: 'Escreva um titulo', // titulo padrão
    size: 'md', // Tamanho padrão
  }
)

const { size } = toRefs(props)

// classe dos Tamanhos do botao
const sizeClass = computed(() => {
  switch (size.value) {
    case 'sm':
      return 'px-4 py-0.2 text-sm'
    case 'lg':
      return 'px-8 py-0.2 text-lg'
    case 'md':
    default:
      return 'px-10 py-0.2 text-base'
  }
})
</script>

<style scoped>
.divisor {
    display: flex;
    position:absolut;
    margin: 30px;
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