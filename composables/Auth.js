// composables/useAuth.js
export class AuthService {
  constructor() {
    this.Url = 'https://api.promohawk.com.br/api/auth'
  }

  async login(dados) {
    const { data, error } = await useFetch(`${this.Url}/login`, {
      method: 'POST',
      body: dados,
      credentials: 'include',
    })

    if (error.value) throw error.value
    if (!data.value.status) throw new Error(data.value.message || 'Erro no login')

    return data.value
  }

  async logout() {
    const { error } = await useFetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    if (error.value) throw error.value
  }

  async buscarUsuario() {
    const { data, error } = await useFetch(`${this.baseUrl}/me`, {
      credentials: 'include',
    })
    if (error.value) throw error.value
    return data.value.user || null
  }

  async forgotPassword(email) {
    const { error } = await useFetch(`${this.baseUrl}/forgot-password`, {
      method: 'POST',
      body: { email },
    })
    if (error.value) throw error.value
  }

  async resetPassword(dados) {
    const { data, error } = await useFetch(`${this.baseUrl}/reset-password`, {
      method: 'POST',
      body: dados,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error.value) throw error.value
    if (data.value.status !== 200) {
      throw new Error(data.value.message || 'Erro ao redefinir a senha')
    }

    return data.value
  }
}

// composable reativo que gerencia estado + usa o serviço
export function useAuth() {
  const usuario = ref(null)
  const token = ref(null)
  const erro = ref(null)
  const carregando = ref(false)

  const service = new AuthService()

  const isLoggedIn = computed(() => !!usuario.value)

  async function login(dados) {
    carregando.value = true
    erro.value = null
    try {
      const res = await service.login(dados)
      usuario.value = res.user || null
      token.value = res.token || null
      return res
    } catch (err) {
      erro.value = err
      throw err
    } finally {
      carregando.value = false
    }
  }

  async function logout() {
    carregando.value = true
    erro.value = null
    try {
      await service.logout()
      usuario.value = null
      token.value = null
    } catch (err) {
      erro.value = err
      throw err
    } finally {
      carregando.value = false
    }
  }

  async function buscarUsuario() {
    carregando.value = true
    erro.value = null
    try {
      usuario.value = await service.buscarUsuario()
      return usuario.value
    } catch (err) {
      usuario.value = null
      erro.value = err
      throw err
    } finally {
      carregando.value = false
    }
  }

  async function forgotPassword(email) {
    carregando.value = true
    erro.value = null
    try {
      await service.forgotPassword(email)
    } catch (err) {
      erro.value = err
      throw err
    } finally {
      carregando.value = false
    }
  }

  async function resetPassword(dados) {
    carregando.value = true
    erro.value = null
    try {
      await service.resetPassword(dados)
    } catch (err) {
      erro.value = err
      throw err
    } finally {
      carregando.value = false
    }
  }

  return {
    usuario,
    token,
    erro,
    carregando,
    isLoggedIn,
    login,
    logout,
    buscarUsuario,
    forgotPassword,
    resetPassword,
  }
}