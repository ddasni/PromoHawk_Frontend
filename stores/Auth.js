import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    token: null,
    erro: null,
    carregando: false,
  }),

  actions: {
    async login(dados) {
      this.carregando = true
      this.erro = null
      try {
        const res = await $fetch(`https://api.promohawk.com.br/api/auth/login`, {
          method: 'POST',
          body: dados,
          credentials: 'include',  // importante para Laravel Sanctum
        })

        if (!res.status) throw new Error(res.message || 'Erro no login')

        this.token = res.token || null
        this.usuario = res.user || null
        return res
      } catch (error) {
        this.erro = error
        throw error
      } finally {
        this.carregando = false
      }
    },

    async logout() {
      this.carregando = true
      this.erro = null
      try {
        await $fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        })
        this.token = null
        this.usuario = null
      } catch (error) {
        this.erro = error
        throw error
      } finally {
        this.carregando = false
      }
    },

    async buscarUsuario() {
      this.carregando = true
      this.erro = null
      try {
        const res = await $fetch(`https://api.promohawk.com.br/api/auth/me`, {
          credentials: 'include',
        })

        this.usuario = res.user || null
        return this.usuario
      } catch (error) {
        this.usuario = null
        this.erro = error
        throw error
      } finally {
        this.carregando = false
      }
    },

     // ESQUECI A SENHA - envia email para reset
    async forgotPassword(email) {
      this.carregando = true
      this.erro = null
      try {
        await $fetch(`https://api.promohawk.com.br/api/auth/forgot-password`, {
          method: 'POST',
          body: { email },
        })
      } catch (error) {
        this.erro = error
        throw error
      } finally {
        this.carregando = false
      }
    },

    // NOVA SENHA - com token, email, senha e confirmação
    async resetPassword(dados) {
      this.carregando = true
      this.erro = null
      try {
        const res = await $fetch(`https://api.promohawk.com.br/api/auth/reset-password`, {
          method: 'POST',
          body: JSON.stringify(dados), // { token, email, password, password_confirmation }
          headers: {
                'Content-Type': 'application/json',
            },
        })

        if (res.status !== 200) {
          throw new Error(res.message || 'Erro ao redefinir a senha')
        }
      } catch (error) {
        this.erro = error
        throw error
      } finally {
        this.carregando = false
      }
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.usuario,
  },
})