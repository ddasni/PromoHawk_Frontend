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
    children: [] // ← será preenchido via API
  }
])

onMounted(async () => {
  try {
    const res = await fetch('https://api.promohawk.com.br/api/categoria')
    const json = await res.json()
    const categorias = json?.categorias || []

    const categoriasFormatadas = categorias.map((cat: any) => ({
      label: cat.nome,
      to: `/categoria/${cat.id}`
    }))

    // Atualiza apenas o item "Categorias"
    const categoriaMenu = items.value.find(i => i.label === 'Categorias')
    if (categoriaMenu) {
      categoriaMenu.children = categoriasFormatadas
    }
  } catch (e) {
    console.error('Erro ao carregar categorias', e)
  }
})
</script>



<style scoped>
</style>
