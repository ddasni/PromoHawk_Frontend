<template>
  <UDropdownMenu size="xl" arrow :items="items" :ui="{ content: 'w-48' }">
    <UButton
      class="p-0 w-9 h-9 rounded-full overflow-hidden"
      size="sm"
      color="primary"
      variant="solid"
    >
      <UAvatar
        :src="user.imagem ? getFullImageUrl(user.imagem) : undefined"
        :icon="!user.imagem ? 'mdi:user' : undefined"
        size="md"
        class="rounded-full object-cover w-full h-full"
      />
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie, useRuntimeConfig } from '#app'
import { useLogout } from '~/composables/useLogout'

// Interface do usuário
interface User {
  username?: string
  imagem?: string
}

// Cookies e configs
const tokenCookie = useCookie('token')
const userCookie = useCookie<User>('user')
const config = useRuntimeConfig()
const router = useRouter()

// Estado de login
const isLoggedIn = ref(!!tokenCookie.value)

// Reatividade para mudanças no cookie do token
watch(tokenCookie, (newVal) => {
  isLoggedIn.value = !!newVal
})

// Objeto de usuário reativo
const user = computed(() => userCookie.value || {})

// Função para montar a URL da imagem
const getFullImageUrl = (path: string | undefined) => {
  if (!path) return 'mdi:account'
  return path.startsWith('http') ? path : `${config.public.apiImage}${path}`
}

// Função de logout
const { logout } = useLogout()

// Itens do dropdown baseados no login
const items = computed(() => {
  if (!isLoggedIn.value) {
    return [
      [
        {
          label: 'Visitante',
          type: 'label',
          icon: 'mdi:user',
        },
      ],
      [
        {
          label: 'Entrar',
          icon: 'mdi:login',
          onClick: () => router.push('/login'),
        },
        {
          label: 'Cadastrar',
          icon: 'mdi:account-plus',
          onClick: () => router.push('/cadastro'),
        },
      ],
    ]
  }

  return [
    [
      {
        label: user.value.username || 'Usuário',
        type: 'label',
        avatar: { src: getFullImageUrl(user.value.imagem) },
      },
    ],
    [
      {
        label: 'Perfil',
        icon: 'mdi:account',
        onClick: () => router.push('/perfil'),
      },
      {
        label: 'Lista de Desejos',
        icon: 'mdi:heart-outline',
        onClick: () => router.push('/listadesejo'),
      },
      {
        label: 'Sobre nós',
        icon: 'mdi:cog-outline',
        onClick: () => router.push('/sobre'),
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
})
</script>
