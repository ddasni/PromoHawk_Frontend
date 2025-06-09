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
import { ref } from 'vue'
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
    children: [
      { label: 'Eletrônico', to: '/categoria/eletronico' },
      { label: 'Informática', to: '/categoria/informatica' },
      { label: 'Moda e Beleza', to: '/categoria/moda-e-beleza' },
      { label: 'Casa e Eletrodomésticos', to: '/categoria/casa-e-eletrodomesticos' },
      { label: 'Saúde', to: '/categoria/saude' },
      { label: 'Games', to: '/categoria/games' }
    ]
  }
])
</script>

<style scoped>
</style>
