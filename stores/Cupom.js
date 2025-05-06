import { defineStore } from 'pinia'
import { API_URL } from '@/utils/config'

export const useCupomStore = defineStore('cupom', {
  state: () => ({
    cupons: [],
    loading: false,
    erro: null
  }),

  actions: {
    async consultarCupons(id = null) {
      this.loading = true
      try {
        const url = id
          ? `${API_URL}/cupom/consultar/${id}`
          : `${API_URL}/cupom/consultar`
    
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

    async cadastrarCupom(dados) {
      const res = await fetch('${API_URL}/cupom/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao criar cupom')
      await this.fetchCupons()
    },

    async atualizarCupom(id, dados) {
      const res = await fetch(`${API_URL}/cupom/atualizar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!res.ok) throw new Error('Erro ao atualizar cupom')
      await this.fetchCupons()
    },

    async deletarCupom(id) {
      const res = await fetch(`${API_URL}/cupom/deletar/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erro ao excluir cupom')
      await this.fetchCupons()
    }
  }
})