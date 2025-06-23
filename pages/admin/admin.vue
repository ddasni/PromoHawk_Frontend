<template>
  <div class="admin-page">
    <header class="header">
      <h1>Painel do Administrador</h1>
    </header>

    <main class="content">
      <!-- Error Message Display -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Setor de Reviews -->
      <section class="card">
        <h2><Icon name="mdi:note-edit-outline" class="icon" /> Gerenciar Reviews</h2>
        <div v-if="reviewsLoading">Carregando reviews...</div>
        <div v-else-if="reviews && reviews.length">
          <div
            class="item"
            v-for="review in reviews"
            :key="review.id"
          >
            <div class="info">
              <p class="review-text">"{{ review.texto }}"</p>
              <p class="user-name">
                Por: <strong>@{{ review.username }}</strong> |
                <span class="date">{{ formatDate(review.data) }}</span>
              </p>
            </div>
            <button class="btn-delete" @click="deletarReview(review.id)">
              Excluir
            </button>
          </div>
        </div>
        <p v-else class="empty">Nenhuma review cadastrada.</p>
      </section>

      <!-- Setor de Usuários -->
      <section class="card">
        <h2><Icon name="mdi:account-group" class="icon" /> Gerenciar Usuários</h2>

        <!-- Barra de Pesquisa -->
        <div class="search-container">
          <Icon name="mdi:magnify" class="search-icon" />
          <input
            v-model="busca"
            type="text"
            placeholder="Buscar usuário pelo nome de usuário..."
            class="search-bar"
          />
        </div>

        <div v-if="usuariosLoading">Carregando usuários...</div>
        <div v-else-if="usuariosFiltrados && usuariosFiltrados.length">
          <div
            class="item"
            v-for="usuario in usuariosFiltrados"
            :key="usuario.id"
          >
            <div class="info">
              <p class="user-name">
                <strong>@{{ usuario.username }}</strong>
              </p>
              <p class="email">{{ usuario.email }}</p>
              <p class="user-id">ID: {{ usuario.id }}</p>
            </div>
            <button class="btn-delete" @click="deletarUsuario(usuario.id)">
              Excluir
            </button>
          </div>
        </div>
        <p v-else class="empty">Nenhum usuário encontrado.</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

definePageMeta({ layout: 'basic' })

const reviews = ref([])
const usuarios = ref([])
const busca = ref('')
const reviewsLoading = ref(true)
const usuariosLoading = ref(true)
const errorMessage = ref('')

const adminToken = useCookie('admin_token').value
const headers = {
  Authorization: `Bearer ${adminToken}`,
  'Content-Type': 'application/json',
}

const fetchReviews = async () => {
  try {
    reviewsLoading.value = true
    errorMessage.value = ''

    const response = await fetch('https://api.promohawk.com.br/api/review', {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Resposta completa da API (reviews):', data)

    if (!data || !Array.isArray(data.reviews)) {
      console.warn('Estrutura de dados não reconhecida:', data)
      errorMessage.value = 'Formato de dados inesperado para reviews'
      return
    }

    reviews.value = data.reviews.map(item => ({
      id: item.id,
      texto: item.comentario_produto || 'Sem conteúdo',
      username: item.usuario?.username || 'Anônimo',
      data: item.created_at
    }))

  } catch (err) {
    console.error('Erro ao processar reviews:', err)
    errorMessage.value = 'Falha ao carregar reviews: ' + err.message
    reviews.value = []
  } finally {
    reviewsLoading.value = false
  }
}

const fetchUsuarios = async () => {
  try {
    usuariosLoading.value = true
    errorMessage.value = ''

    const response = await fetch('https://api.promohawk.com.br/api/users', {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Resposta completa da API (usuários):', data)

    if (!data || !Array.isArray(data.usuarios)) {
      console.warn('Estrutura de dados não reconhecida:', data)
      errorMessage.value = 'Formato de dados inesperado para usuários'
      return
    }

    usuarios.value = data.usuarios.map(user => ({
      id: user.id,
      username: user.username || 'usuário',
      email: user.email || 'email@não.informado'
    }))

  } catch (err) {
    console.error('Erro ao processar usuários:', err)
    errorMessage.value = 'Falha ao carregar usuários: ' + err.message
    usuarios.value = []
  } finally {
    usuariosLoading.value = false
  }
}

const deletarReview = async (id) => {
  const confirmar = confirm('Tem certeza que deseja excluir esta review? Esta ação não pode ser desfeita.')
  if (!confirmar) return

  try {
    const response = await fetch(`https://api.promohawk.com.br/api/review/${id}`, {
      method: 'DELETE',
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    reviews.value = reviews.value.filter((r) => r.id !== id)
    alert('Review excluída com sucesso!')
  } catch (err) {
    console.error('Erro ao deletar review:', err)
    alert('Erro ao excluir review: ' + err.message)
  }
}

const deletarUsuario = async (id) => {
  const confirmar = confirm('Tem certeza que deseja excluir este usuário? Esta ação é irreversível.')
  if (!confirmar) return

  try {
    const response = await fetch(`https://api.promohawk.com.br/api/users/${id}`, {
      method: 'DELETE',
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    usuarios.value = usuarios.value.filter((u) => u.id !== id)
    alert('Usuário excluído com sucesso!')
  } catch (err) {
    console.error('Erro ao deletar usuário:', err)
    alert('Erro ao excluir usuário: ' + err.message)
  }
}


const formatDate = (isoDate) => {
  if (!isoDate) return 'Data não disponível'
  try {
    const [dia, mes, ano] = isoDate.split(' ')[0].split('/')
    return `${dia}/${mes}/${ano}`
  } catch {
    return isoDate
  }
}

const usuariosFiltrados = computed(() => {
  if (!busca.value) return usuarios.value
  return usuarios.value.filter((u) =>
    u.username?.toLowerCase().includes(busca.value.toLowerCase())
  )
})

onMounted(() => {
  fetchReviews()
  fetchUsuarios()
})
</script>

<style scoped>
:root {
  --primary: #2e7d32;
  --secondary: #ffffff;
  --background: #f4f6f8;
  --text: #333333;
  --danger: #d32f2f;
  --danger-hover: #b71c1c;
  --card-bg: #ffffff;
  --border: #e0e0e0;
}

body {
  background-color: var(--background);
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.admin-page {
  min-height: 100vh;
}

.header {
  background-color: var(--primary);
  color: var(--secondary);
  padding: 24px;
  text-align: center;
  border-bottom: 4px solid #1b5e20;
}

.header h1 {
  margin: 0;
  font-size: 30px;
}

.content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr;
}

.card {
  background-color: var(--card-bg);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--primary);
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 24px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 12px 0;
}

.item:last-child {
  border-bottom: none;
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.review-text {
  font-size: 16px;
  color: var(--text);
  margin: 0 0 4px 0;
  font-style: italic;
}

.user-name {
  color: #555;
  font-size: 14px;
  margin: 0;
}

.email {
  color: #777;
  font-size: 14px;
  margin: 4px 0 0;
}

.user-id {
  color: #999;
  font-size: 12px;
  margin: 4px 0 0;
}

.date {
  color: #888;
  font-size: 13px;
}

.btn-delete {
  background-color: var(--danger);
  color: var(--secondary);
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  opacity: 1;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s, transform 0.2s;
  margin-left: 12px;
  flex-shrink: 0;
}

.btn-delete:hover {
  background-color: var(--danger-hover);
  transform: scale(1.05);
}

.empty {
  text-align: center;
  color: #999;
  margin-top: 20px;
  padding: 20px;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #ef9a9a;
  grid-column: 1 / -1;
}

/* Barra de pesquisa com ícone */
.search-container {
  position: relative;
  margin-bottom: 16px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  font-size: 20px;
}

.search-bar {
  width: 100%;
  padding: 8px 12px 8px 40px;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 15px;
}

.search-bar:focus {
  outline: none;
  border-color: var(--primary);
}

/* Responsivo */
@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>