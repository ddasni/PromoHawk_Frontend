<template>
  <UDropdownMenu size="xl" arrow :items="items" :ui="{ content: 'w-48' }">
    <UButton
      class="font-bold rounded-full"
      icon="mdi:user"
      size="xl"
      color="primary"
      variant="solid"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app' // composable de cookies do Nuxt 3
import { useLogout } from '~/composables/useLogout'

const tokenCookie = useCookie('token')
const userCookie = useCookie('user')
const router = useRouter()
const isLoggedIn = ref(!!tokenCookie.value)
const { logout } = useLogout()


watch(tokenCookie, (newVal) => {
  isLoggedIn.value = !!newVal
})

function getUserName() {
  try {
    const user = typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value)
      : userCookie.value
    return user?.name || 'Usuário' // corrigido aqui
  } catch (e) {
    return 'Usuário'
  }
}

const items = computed(() => {
  if (!isLoggedIn.value) {
    return [
      [
        {
          label: 'Visitante',
          type: 'label',
          avatar: { src: 'https://github.com/benjamincanac.png' },
        },
      ],
      [
        {
          label: 'Entrar',
          icon: 'icon:user',
          onClick: () => router.push('/login'),
        },
        {
          label: 'Cadastrar',
          icon: 'icon:user-plus',
          onClick: () => router.push('/cadastro'),
        },
      ],
    ]
  } else {
    return [
      [
        {
          label: getUserName(),
          type: 'label',
          avatar: { src: '' },
        },
      ],
      [
        {
          label: 'Perfil',
          icon: 'i-lucide-user',
          onClick: () => router.push('/perfil'),
        },
        {
          label: 'Lista de Desejos',
          icon: 'heroicons-outline:heart',
          onClick: () => router.push('/listadesejo'),
        },
        {
          label: 'Configurações',
          icon: 'i-lucide-cog',
          onClick: () => router.push('/config'),
        },
      ],
      [
        {
          label: 'Logout',
          icon: 'i-lucide-log-out',
          onClick: logout,
        },
      ],
    ]
  }
})
</script>