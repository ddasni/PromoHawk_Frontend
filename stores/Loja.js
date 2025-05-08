import { defineStore } from 'pinia'
import { API_URL } from '@/utils/config'

export const useLojaStore = defineStore('loja', {
  state: () => ({
    lojas: [],
    loading: false,
    erro: null
  }),

  actions: {
    async getLoja(id = null) {
      this.loading = true
      try {
        const url = id
          ? `${API_URL}/loja/consultar/${id}`
          : `${API_URL}/loja/consultar`
    
        const res = await fetch(url)
        if (!res.ok) throw new Error('Erro ao buscar cupom(s)')
    
        const data = await res.json()
    
        // Se buscou todos, atualiza o array completo
        if (id === null) {
          this.loja = data
        } 
        else {
          // Se buscou um só, substitui ou adiciona ao array
          const index = this.loja.findIndex(c => c.id === id)
          if (index !== -1) {
            this.loja[index] = data
          } 
          else {
            this.loja.push(data)
          }
        }
      } catch (e) {
        this.erro = e.message
      } finally {
        this.loading = false
      }
    },

    async postLoja(dados) {
      const res = await fetch('${API_URL}/loja/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar loja')
      await this.getLoja()
    },

    async updateLoja(id, dados) {
      const res = await fetch(`${API_URL}/loja/atualizar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar loja')
      await this.getLoja()
    },

    async deleteLoja(id) {
      const res = await fetch(`${API_URL}/loja/deletar/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir loja')
      await this.getLoja()
    }
  }
})