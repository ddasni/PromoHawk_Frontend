<template>
  <UNavigationMenu arrow color="primary" content-orientation="vertical" :items="items" class="justify-center" />
</template>

<style scoped>

</style>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Início',
    icon: 'ic:baseline-home',
    to: '',
    active: true,
  },
  {
    label: 'Cupons',
    icon: 'iconamoon:discount-fill',
    to: 'Cupons',
    active: false,
  },
  {
    label: 'Lojas',
    icon: 'weui:shop-filled',
    active: false,
    children: [
      {
        label: 'defineShortcuts',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'useOverlay',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'useToast',
        icon: 'i-lucide-file-text',
        to: ''
      }
    ]
  },
  {
    label: 'Categorias',
    icon: 'heroicons-outline:menu',
    active: false,
    children: [
      {
        label: 'Eletrônico',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'Informática',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'Moda e Beleza',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'Casa e Eletrodomésticos',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'Saúde',
        icon: 'i-lucide-file-text',
        to: ''
      },
      {
        label: 'Games',
        icon: 'i-lucide-file-text',
        to: ''
      }
    ]
  }
])
</script>