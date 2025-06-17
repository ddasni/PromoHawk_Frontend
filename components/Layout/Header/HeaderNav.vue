<template>
  <UNavigationMenu 
    arrow
    highlight
    color="primary"
    variant="link"
    content-orientation="vertical"
    class="justify-center"
    :items="items"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useFetch } from '#app'

// ✅ Tipagem da categoria (ajusta conforme sua API)
interface Categoria {
  id: number
  nome: string
}

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Início',
    icon: 'ic:baseline-home',
    to: '/',
  },
  {
    label: 'Cupons',
    icon: 'iconamoon:discount-fill',
    to: '/cupons',
  },
  {
    label: 'Lojas',
    icon: 'weui:shop-filled',
    children: [
      { label: 'Amazon', to: '/loja/amazon' },
      { label: 'Magazineluiza', to: '/loja/magazineluiza' },
      { label: 'Centauro', to: '/loja/centauro' },
      { label: 'Mercado Livre', to: '/loja/mercadolivre' },
      { label: 'Kabum', to: '/loja/kabum' },
      { label: 'Pichau', to: '/loja/pichau' }
    ]
  },
  {
    label: 'Categorias',
    icon: 'heroicons-outline:menu',
    children: [] // Vai ser preenchido dinâmico
  }
])

const carregarCategorias = async () => {
  const { data, error } = await useFetch<{ categorias: Categoria[] }>(
    'https://api.promohawk.com.br/api/categoria'
  )

  if (error.value) {
    console.error('Erro ao buscar categorias:', error.value)
    return
  }

  const categorias = data.value?.categorias || []

  const categoriasFormatadas = categorias.map((categoria) => ({
    label: categoria.nome,
    to: `/categoria/${categoria.id}`  // ou `/categoria/${categoria.nome}` se quiser slug
  }))

  const categoriasMenu = items.value.find(item => item.label === 'Categorias')
  if (categoriasMenu) {
    categoriasMenu.children = categoriasFormatadas
  }
}

onMounted(() => {
  carregarCategorias()
})
</script>



