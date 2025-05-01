import { defineStore } from 'pinia'

export const useCupomStore = defineStore('cupom', {
  state: () => ({
    cupons: [],
    loading: false,
    erro: null
  }),

  actions: {
    async fetchCupons() {
      this.loading = true
      try {
        const res = await fetch('https://seusite.com/api/cupom')
        this.cupons = await res.json()
      } catch (e) {
        this.erro = e.message
      } finally {
        this.loading = false
      }
    },

    async createCupom(dados) {
      const res = await fetch('https://seusite.com/api/cupom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar cupom')
      await this.fetchCupons()
    },

    async updateCupom(id, dados) {
      const res = await fetch(`https://seusite.com/api/cupom/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar cupom')
      await this.fetchCupons()
    },

    async deleteCupom(id) {
      const res = await fetch(`https://seusite.com/api/cupom/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir cupom')
      await this.fetchCupons()
    }
  }
})