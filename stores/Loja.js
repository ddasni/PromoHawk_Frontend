import { defineStore } from 'pinia'

export const useLojaStore = defineStore('loja', {
  state: () => ({
    lojas: [],
    loading: false,
    erro: null
  }),

  actions: {
    async getLojas() {
      this.loading = true
      try {
            const res = await fetch('https://seusite.com/api/loja')
            this.lojas = await res.json()
      } catch (e) {
            this.erro = e.message
      } finally {
            this.loading = false
      }
    },

    async getLojaID() {
        this.loading = true
        try {
            const res = await fetch(`https://seusite.com/api/loja/${id}`)
            if (!res.ok) throw new Error('Loja não encontrada')
            this.lojaSelecionada = await res.json()
        } catch (e) {
            this.erro = e.message
        } finally {
            this.loading = false
        }
    },

    async postLoja(dados) {
      const res = await fetch('https://seusite.com/api/loja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar loja')
      await this.getLoja()
    },

    async updateLoja(id, dados) {
      const res = await fetch(`https://seusite.com/api/loja/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar loja')
      await this.getLoja()
    },

    async deleteLoja(id) {
      const res = await fetch(`https://seusite.com/api/loja/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir loja')
      await this.getLoja()
    }
  }
})