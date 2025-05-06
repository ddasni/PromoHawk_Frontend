import { defineStore } from 'pinia'
import { API_URL } from '@/utils/config'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    loading: false,
    erro: null
  }),

  actions: {
    async consultarProduto(id = null) {
      this.loading = true
      try {
        const url = id
          ? `${API_URL}/produto/consultar/${id}`
          : `${API_URL}/produto/consultar`
    
        const res = await fetch(url)
        if (!res.ok) throw new Error('Erro ao buscar cupom(s)')
    
        const data = await res.json()
    
        // Se buscou todos, atualiza o array completo
        if (id === null) {
          this.cupons = data
        } 
        else {
          // Se buscou um só, substitui ou adiciona ao array
          const index = this.cupons.findIndex(c => c.id === id)
          if (index !== -1) {
            this.cupons[index] = data
          } 
          else {
            this.cupons.push(data)
          }
        }
      } catch (e) {
        this.erro = e.message
      } finally {
        this.loading = false
      }
    },

    async cadastrarProduto(dados) {
      const res = await fetch('${API_URL}/produto/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar produto')
      await this.fetchProdutos()
    },

    async atualizarProduto(id, dados) {
      const res = await fetch(`${API_URL}/produto/atualizar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar produto')
      await this.fetchProdutos()
    },

    async deletarProduto(id) {
      const res = await fetch(`${API_URL}/produto/deletar/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir produto')
      await this.fetchProdutos()
    }
  }
})