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
    children: [] // ← será preenchido via API
  },
  {
    label: 'Categorias',
    icon: 'heroicons-outline:menu',
    children: [] // ← será preenchido via API
  }
])

const fetchData = async () => {
  try {
    // Busca categorias
    const catRes = await fetch('https://api.promohawk.com.br/api/categoria')
    const catJson = await catRes.json()
    const categorias = (catJson?.categorias || []).slice(0, 10) // Limita a 10 itens

    const categoriasFormatadas = categorias.map((cat: any) => ({
      label: cat.nome,
      to: `/categoria/${cat.slug || cat.id}` // Usa slug se existir, caso contrário usa id
    }))

    // Busca lojas
    const lojaRes = await fetch('https://api.promohawk.com.br/api/loja')
    const lojaJson = await lojaRes.json()
    const lojas = (lojaJson?.lojas || []).slice(0, 10) // Limita a 10 itens

    const lojasFormatadas = lojas.map((loja: any) => ({
      label: loja.nome,
      to: `/loja/${loja.slug || loja.id}` // Usa slug se existir, caso contrário usa id
    }))

    // Atualiza os itens do menu
    items.value = items.value.map(item => {
      if (item.label === 'Categorias') {
        return { ...item, children: categoriasFormatadas }
      }
      if (item.label === 'Lojas') {
        return { ...item, children: lojasFormatadas }
      }
      return item
    })
  } catch (e) {
    console.error('Erro ao carregar dados da API', e)
  }
}

onMounted(fetchData)
</script>

<style scoped>
</style>
