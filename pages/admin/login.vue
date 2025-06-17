<template>
  <div class="page-center">
    <div class="login-container">
      <h2>Login do Administrador</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input
            v-model="loginData.email"
            type="email"
            id="email"
            required
            placeholder="exemplo@dominio.com"
            @input="clearError"
          />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input
            v-model="loginData.password"
            type="password"
            id="password"
            required
            placeholder="Digite sua senha"
            @input="clearError"
            minlength="6"
          />
        </div>
        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="!loading">Entrar</span>
          <span v-else class="loading-spinner"></span>
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'basic'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

const router = useRouter()
const loginData = ref({
  email: '',
  password: ''
})
const error = ref('')
const loading = ref(false)

// Cookies
const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 * 30 })
const userCookie = useCookie('user')

const clearError = () => error.value = ''

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Validação básica no frontend
    if (!loginData.value.email || !loginData.value.password) {
      error.value = 'Todos os campos são obrigatórios'
      loading.value = false
      return
    }

    // Normalização dos dados
    const payload = {
      email: loginData.value.email.trim().toLowerCase(),
      password: loginData.value.password
    }

    console.log('Enviando para API:', payload)

    const response = await fetch('https://api.promohawk.com.br/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    console.log('Resposta da API:', data)

    if (!response.ok) {
      handleApiError(response, data)
      return
    }

    if (!data.token || !data.user) {
      error.value = 'Resposta inválida do servidor'
      loading.value = false
      return
    }

    // Login bem-sucedido
    tokenCookie.value = data.token
    userCookie.value = data.user
    await router.push('/admin')

  } catch (err) {
    console.error('Erro inesperado:', err)
    error.value = 'Erro na conexão com o servidor'
  } finally {
    loading.value = false
  }
}

const handleApiError = (response, data) => {
  console.error('Erro da API:', { status: response.status, data })
  
  if (response.status === 422) {
    // Tratamento especial para erros de validação
    if (data.errors) {
      const errorMessages = []
      if (data.errors.email) errorMessages.push(...data.errors.email)
      if (data.errors.password) errorMessages.push(...data.errors.password)
      error.value = errorMessages.join(' ') || 'Dados inválidos'
    } else {
      error.value = data.message || 'Verifique seu e-mail e senha'
    }
  } else if (response.status === 401) {
    error.value = 'Credenciais inválidas'
  } else {
    error.value = 'Erro no servidor. Tente novamente.'
  }
}
</script>


<style scoped>
.page-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.login-container {
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border-color: seagreen;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: seagreen;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;
}

.btn-login:hover {
  background-color: darkgreen;
}

.btn-login:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 12px;
  color: #d32f2f;
  font-size: 14px;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>






