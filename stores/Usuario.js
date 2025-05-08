import { defineStore } from 'pinia'
import { API_URL } from '@/utils/config'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuarios: [],
    loading: false,
    erro: null
  }),

  actions: {
    async consultarUsuario(id) {
        this.loading = true
        try {
            const res = await fetch(`${API_URL}/usuario/${id}`)
            if (!res.ok) throw new Error('Loja não encontrada')
            this.usuarioSelecionado = await res.json()
        } catch (e) {
            this.erro = e.message
        } finally {
            this.loading = false
        }
    },

    async cadastrarUsuario(dados) {
      const res = await fetch('${API_URL}/usuario/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar usuario')
      await this.fetchusuario()
    },

    async atualizarUsuario(id, dados) {
      const res = await fetch(`${API_URL}/usuario/atualizar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar usuario')
      await this.fetchUsuario()
    },

    async deletarUsuario(id) {
      const res = await fetch(`${API_URL}/usuario/deletar/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir usuario')
      await this.fetchUsuario()
    }
  }
})