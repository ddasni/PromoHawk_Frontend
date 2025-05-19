<template>
  <UDropdownMenu size="xl" arrow :items="items" :ui="{ content: 'w-48' }">
    <UButton
      class="font-bold rounded-full"
      icon="icon:user"
      size="xl"
      color="primary"
      variant="solid"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

// Cookies
const tokenCookie = useCookie('token')
const userCookie = useCookie('user')

// Router
const router = useRouter()

// Estado de login
const isLoggedIn = ref(!!tokenCookie.value)

watch(tokenCookie, (newVal) => {
  isLoggedIn.value = !!newVal
})

// Função de logout
function logout() {
  tokenCookie.value = null
  userCookie.value = null
  isLoggedIn.value = false
  router.push('/')
}

// Obter nome com segurança
function getUserName() {
  try {
    const user = typeof userCookie.value === 'string'
      ? JSON.parse(userCookie.value)
      : userCookie.value

    return user?.name || 'Usuário'
  } catch (e) {
    return 'Usuário'
  }
}

// Menu dinâmico
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
          label: 'Login',
          icon: 'icon:user',
          onClick: () => router.push('/login'),
        },
        {
          label: 'Cadastro',
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






<style scoped>

</style>