import { defineStore } from 'pinia'
import { API_URL } from '@/utils/config'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuarios: [],
    usuario: null,
    erro: null,
    carregando: false,
  }),


  actions: {
    async buscarTodos() {
      this.carregando = true
      try {
        const { data } = await useFetch(`${API_URL}/users`, {
          transform: (data) => data.usuarios,
        })
        this.usuarios = data.value || []
      } catch (error) {
        this.erro = error
      } finally {
        this.carregando = false
      }
    },


    async buscarPorId(id) {
      this.carregando = true
      try {
        const { data } = await useAsyncData(`usuario-${id}`, () =>
          $fetch(`${API_URL}/users/${id}`).then((res) => res.user)
        )
        this.usuario = data.value
      } catch (error) {
        this.erro = error
      } finally {
        this.carregando = false
      }
    },


    async cadastrar(dados) {
      try {
        const res = await $fetch(`${API_URL}/users`, {
          method: 'POST',
          body: dados,
        })
        if (!res.status) throw new Error(res.message || 'Erro ao cadastrar usuário')
        return res
      } catch (error) {
        this.erro = error
        throw error
      }
    },


    async atualizar(id, dados) {
      try {
        const res = await $fetch(`${API_URL}/users/${id}`, {
          method: 'PUT',
          body: dados,
        })
        if (!res.status) throw new Error(res.message || 'Erro ao atualizar usuário')
        return res
      } catch (error) {
        this.erro = error
        throw error
      }
    },

    
    async deletar(id) {
      try {
        const res = await $fetch(`${API_URL}/users/${id}`, {
          method: 'DELETE',
        })
        if (!res.status) throw new Error(res.message || 'Erro ao deletar usuário')
        return res
      } catch (error) {
        this.erro = error
        throw error
      }
    },
  },
})