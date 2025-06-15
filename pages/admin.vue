<template>
  <div class="admin-container">
    <h1>Área do Administrador</h1>

    <section>
      <h2>Reviews</h2>
      <ul>
        <li v-for="review in reviews" :key="review.id">
          {{ review.texto }}
          <button @click="confirmarDelecaoReview(review.id)">Excluir</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Usuários</h2>
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">
          {{ usuario.nome }}
          <button @click="confirmarDelecaoUsuario(usuario.id)">Excluir</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

definePageMeta({
  middleware: 'admin-only',
})

const token = useCookie('token')
const reviews = ref([])
const usuarios = ref([])

const fetchData = async () => {
  const headers = { Authorization: `Bearer ${token.value}` }

  try {
    const resReview = await $fetch('https://api.promohawk.com.br/review', { headers })
    reviews.value = resReview
  } catch (err) {
    console.error('Erro ao carregar reviews', err)
  }

  try {
    const resUsuarios = await $fetch('https://api.promohawk.com.br/users', { headers })
    usuarios.value = resUsuarios
  } catch (err) {
    console.error('Erro ao carregar usuários', err)
  }
}

onMounted(fetchData)

const deletarReview = async (id) => {
  try {
    await $fetch(`https://api.promohawk.com.br/review/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` },
    })
    reviews.value = reviews.value.filter((r) => r.id !== id)
  } catch (err) {
    console.error('Erro ao deletar review:', err)
    alert('Erro ao deletar review.')
  }
}

const deletarUsuario = async (id) => {
  try {
    await $fetch(`https://api.promohawk.com.br/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` },
    })
    usuarios.value = usuarios.value.filter((u) => u.id !== id)
  } catch (err) {
    console.error('Erro ao deletar usuário:', err)
    alert('Erro ao deletar usuário.')
  }
}

const confirmarDelecaoReview = async (id) => {
  if (confirm('Tem certeza que deseja excluir esta review?')) {
    await deletarReview(id)
  }
}

const confirmarDelecaoUsuario = async (id) => {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    await deletarUsuario(id)
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
h1, h2 {
  margin-bottom: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background-color: crimson;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: darkred;
}
</style>

