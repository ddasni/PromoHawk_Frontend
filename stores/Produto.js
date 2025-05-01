import { defineStore } from 'pinia'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    loading: false,
    erro: null
  }),

  actions: {
    async getProdutos() {
      this.loading = true
      try {
        const res = await fetch('https://seusite.com/api/produto')
        this.produtos = await res.json()
      } catch (e) {
        this.erro = e.message
      } finally {
        this.loading = false
      }
    },

    async createProduto(dados) {
      const res = await fetch('https://seusite.com/api/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar produto')
      await this.fetchProdutos()
    },

    async updateProduto(id, dados) {
      const res = await fetch(`https://seusite.com/api/produto/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar produto')
      await this.fetchProdutos()
    },

    async deleteProduto(id) {
      const res = await fetch(`https://seusite.com/api/produto/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir produto')
      await this.fetchProdutos()
    }
  }
})