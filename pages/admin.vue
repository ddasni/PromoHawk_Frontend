<template>
  <div class="admin-page">
    <header class="header">
      <h1> Painel do Administrador</h1>
    </header>

    <main class="content">
      <!-- Setor de Reviews -->
      <section class="card">
        <h2>📝 Gerenciar Reviews</h2>
        <div v-if="reviews.length">
          <div
            class="item"
            v-for="review in reviews"
            :key="review.id"
          >
            <div class="info">
              <p class="review-text">“{{ review.texto }}”</p>
              <p class="user-name">
                Por: <strong>@{{ review.username }}</strong> | 
                <span class="date">{{ formatDate(review.data) }}</span>
              </p>
            </div>
            <button class="btn-delete">
               Excluir
            </button>
          </div>
        </div>
        <p v-else class="empty">Nenhuma review cadastrada.</p>
      </section>

      <!-- Setor de Usuários -->
      <section class="card">
        <h2>👥 Gerenciar Usuários</h2>

        <!-- Barra de Pesquisa -->
        <div class="search-container">
          <span class="icon">🔍</span>
          <input
            v-model="busca"
            type="text"
            placeholder="Buscar usuário pelo nome de usuário..."
            class="search-bar"
          />
        </div>

        <div v-if="usuariosFiltrados.length">
          <div
            class="item"
            v-for="usuario in usuariosFiltrados"
            :key="usuario.id"
          >
            <div class="info">
              <p class="user-name"><strong>@{{ usuario.username }}</strong></p>
              <p class="email">{{ usuario.email }}</p>
            </div>
            <button class="btn-delete">
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
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'basic',
})

// Dados simulados
const reviews = [
  {
    id: 1,
    texto: 'Produto excelente, recomendo muito!',
    username: 'gabriel_p',
    data: '2025-06-01T10:00:00Z',
  },
  {
    id: 2,
    texto: 'Chegou rápido e bem embalado.',
    username: 'fernanda_s',
    data: '2025-06-05T15:30:00Z',
  },
  {
    id: 3,
    texto: 'Infelizmente veio com defeito.',
    username: 'lucas_a',
    data: '2025-06-10T09:45:00Z',
  },
]

const usuarios = [
  { id: 1, username: 'gabriel_p', email: 'gabriel@email.com' },
  { id: 2, username: 'fernanda_s', email: 'fernanda@email.com' },
  { id: 3, username: 'lucas_a', email: 'lucas@email.com' },
]

// Função para formatar data
const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Barra de pesquisa
const busca = ref('')

const usuariosFiltrados = computed(() => {
  if (!busca.value) return usuarios
  return usuarios.filter((u) =>
    u.username.toLowerCase().includes(busca.value.toLowerCase())
  )
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
}

.review-text {
  font-size: 16px;
  color: var(--text);
  margin: 0 0 4px 0;
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
}

.btn-delete:hover {
  background-color: var(--danger-hover);
  transform: scale(1.05);
}

.empty {
  text-align: center;
  color: #999;
  margin-top: 20px;
}

/* Barra de pesquisa com ícone */
.search-container {
  position: relative;
  margin-bottom: 16px;
}

.search-container .icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
}

.search-bar {
  width: 100%;
  padding: 8px 12px 8px 36px;
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






