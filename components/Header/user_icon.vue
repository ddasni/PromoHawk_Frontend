<template>
  <UDropdownMenu
    arrow
    :items="items"
    :ui="{
      content: 'w-48'
    }"
  >
    <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
])
</script>

<style scoped>

</style>