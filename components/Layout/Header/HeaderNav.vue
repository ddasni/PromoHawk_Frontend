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
    to: '/Cupons',
  },
  {
    label: 'Lojas',
    icon: 'weui:shop-filled',
    children: [
      {
        label: 'Amazon',
        to: '/loja/amazon'
      },
      {
        label: 'Magazineluiza',
        to: '/loja/magazineluiza'
      },
      {
        label: 'Centauro',
        to: '/loja/centauro'
      },
      {
        label: 'Mercado Livre',
        to: '/loja/mercadolivre'
      },
      {
        label: 'Kabum',
        to: '/loja/kabum'
      },
      {
        label: 'Pichau',
        to: '/loja/pichau'
      }
    ]
  },
  {
    label: 'Categorias',
    icon: 'heroicons-outline:menu',
    children: [
      {
        label: 'Eletrônico',
        to: '/Categoria'
      },
      {
        label: 'Informática',
        to: '/Categoria'
      },
      {
        label: 'Moda e Beleza',
        to: '/modas'
      },
      {
        label: 'Casa e Eletrodomésticos',
        to: '/Categoria'
      },
      {
        label: 'Saúde',
        to: '/Categoria'
      },
      {
        label: 'Games',
        to: '/Categoria'
      }
    ]
  }
])
</script>