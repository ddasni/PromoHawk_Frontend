<template>
  <UNavigationMenu 
      arrow 
      highlight 
      color="primary" 
      content-orientation="vertical" 
      class="justify-center"
      :items="items" 
  />
</template>

<style scoped>

</style>

<script setup lang="ts">
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
    to: 'Cupons',
  },
  {
    label: 'Lojas',
    icon: 'weui:shop-filled',
    children: [
      {
        label: 'Amazon',
        to: 'Loja'
      },
      {
        label: 'Magazineluiza',
        to: 'Loja'
      },
      {
        label: 'Centauro',
        to: 'Loja'
      },
      {
        label: 'Mercado Livre',
        to: 'Loja'
      },
      {
        label: 'Kabum',
        to: 'Loja'
      },
      {
        label: 'Pichau',
        to: 'Loja'
      }
    ]
  },
  {
    label: 'Categorias',
    icon: 'heroicons-outline:menu',
    children: [
      {
        label: 'Eletrônico',
        to: 'Categoria'
      },
      {
        label: 'Informática',
        to: 'Categoria'
      },
      {
        label: 'Moda e Beleza',
        to: 'Categoria'
      },
      {
        label: 'Casa e Eletrodomésticos',
        to: 'Categoria'
      },
      {
        label: 'Saúde',
        to: 'Categoria'
      },
      {
        label: 'Games',
        to: 'Categoria'
      }
    ]
  }
])
</script>