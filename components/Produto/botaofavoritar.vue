<template>
  <button @click.stop="toggleFavorito" :class="{ ativo: favoritado }" class="botao-favoritar">
    {{ favoritado ? '💖' : '🤍' }}
  </button>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useCookie, useFetch } from '#app'

const props = defineProps({
  produtoId: {
    type: Number,
    required: true
  }
})

const token = useCookie('token')
const favoritado = ref(false)
const favoritoId = ref(null)
const usuarioId = ref(null)

async function carregarUsuario() {
  if (!token.value) return

  try {
    const { data, error } = await useFetch('https://api.promohawk.com.br/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    if (error.value) throw error.value

    usuarioId.value = data.value?.usuario?.id || data.value?.id
    console.log('Usuário ID carregado:', usuarioId.value)
  } catch (err) {
    console.error('Erro ao buscar usuário:', err)
  }
}

async function carregarFavoritos() {
  if (!token.value || !usuarioId.value) return

  try {
    const { data } = await useFetch('https://api.promohawk.com.br/api/user-favoritos', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    console.log('Resposta da API /user-favoritos:', data.value)

    const favoritos = data.value?.favoritos ?? []

    if (Array.isArray(favoritos)) {
      const favorito = favoritos.find(item => item.produto_id === props.produtoId)
      if (favorito) {
        favoritado.value = true
        favoritoId.value = favorito.id
        console.log('Produto está favoritado:', favoritoId.value)
      } else {
        favoritado.value = false
        favoritoId.value = null
        console.log('Produto NÃO está nos favoritos.')
      }
    } else {
      console.warn('Resposta inesperada de /user-favoritos (favoritos não é array):', data.value)
    }
  } catch (error) {
    console.error('Erro ao verificar favoritos:', error)
  }
}

async function toggleFavorito() {
  if (!token.value) {
    alert('Você precisa estar logado para favoritar.')
    return
  }

  if (!usuarioId.value) {
    console.error('usuarioId ausente')
    alert('Não foi possível identificar o usuário.')
    return
  }

  try {
    if (favoritado.value) {
      // Remover favorito
      if (!favoritoId.value) {
        console.error('favoritoId é undefined. Não foi possível remover o favorito.')
        return
      }

      const res = await fetch(`https://api.promohawk.com.br/api/favorito/${favoritoId.value}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json?.message || 'Erro ao remover favorito.')
      }

      favoritado.value = false
      favoritoId.value = null
      console.log('Favorito removido com sucesso.')
    } else {
      // Adicionar favorito
      const res = await fetch('https://api.promohawk.com.br/api/favorito', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          produto_id: props.produtoId,
          usuario_id: usuarioId.value
        })
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.erros ? JSON.stringify(json.erros) : 'Erro desconhecido')
      }

      favoritado.value = true

      if (json?.id) {
        favoritoId.value = json.id
        console.log('Favorito adicionado com ID:', favoritoId.value)
      } else {
        console.warn('ID não retornado após adicionar favorito. Recarregando...')
        await carregarFavoritos()
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error)
    alert('Erro ao atualizar favorito. Veja o console para detalhes.')
  }
}

onMounted(async () => {
  const userCookie = useCookie('user')
  usuarioId.value = userCookie.value?.id

  if (!usuarioId.value) {
    await carregarUsuario()
  }

  if (usuarioId.value) {
    await carregarFavoritos()
  }
})

// 🔁 Atualiza favoritos automaticamente quando o usuário muda (ex: login)
watchEffect(() => {
  if (usuarioId.value && token.value) {
    carregarFavoritos()
  }
})
</script>

<style scoped>
.botao-favoritar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.botao-favoritar.ativo {
  color: red;
}
</style>










<style scoped>
.botao-favoritar {
  font-size: 1.4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: color 0.3s ease;
}

.botao-favoritar.ativo {
  color: #e11d48;
}
</style>







