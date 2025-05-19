import { useRouter } from 'vue-router'
import { useCookie } from '#app' // Nuxt 3 composable para cookies

export function useLogout() {
  const tokenCookie = useCookie('token')
  const userCookie = useCookie('user')
  const router = useRouter()

  async function logout() {
    try {
      // Chama sua API para logout
      const response = await fetch('https://api.promohawk.com.br/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenCookie.value}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Erro no logout')

      // Limpa cookies localmente
      tokenCookie.value = null
      userCookie.value = null

      // Redireciona para home
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      alert('Não foi possível sair no momento.')
    }
  }

  return { logout }
}
