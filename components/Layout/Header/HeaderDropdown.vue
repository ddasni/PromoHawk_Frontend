<template>
  <UDropdownMenu size="xl" arrow :items="items" :ui="{ content: 'w-48' }">
    <UButton
      class="p-0 w-9 h-9 rounded-full overflow-hidden"
      size="sm"
      color="primary"
      variant="solid"
    >
     <UAvatar
        :src="userCookie?.imagem ? getFullImageUrl(userCookie.imagem) : undefined"
        :icon="!userCookie?.imagem ? 'mdi:user' : undefined"
        size="md"
        class="rounded-full object-cover w-full h-full"
      />
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app' // composable de cookies do Nuxt 3
import { useLogout } from '~/composables/useLogout'


// Definindo a interface do usuário
interface User {
  username?: string
  imagem?: string
  // adicione outras propriedades conforme necessário
}

// importando a url da api
const config = useRuntimeConfig()
const tokenCookie = useCookie('token')
const userCookie = useCookie<User>('user')
const router = useRouter()
const isLoggedIn = ref(!!tokenCookie.value)
const { logout } = useLogout()

const getFullImageUrl = (path: string | undefined) => {
  if (!path) return 'mdi:account' // se não houver imagem retorna um icone
  return path.startsWith('http') ? path : `${config.public.apiImage}${path}`
}

watch(tokenCookie, (newVal) => {
  isLoggedIn.value = !!newVal
})

const items = computed(() => {

  const user = userCookie.value || {}

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
  } else {
    return [
      [
        {
          label: user.username || 'Usuário',
          type: 'label',
          avatar: { src: getFullImageUrl(user.imagem) },
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
          label: 'Configurações',
          icon: 'mdi:cog-outline',
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