<template>
  <div class="page-center">
    <div class="login-container">
      <h2>Login Admin</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="Digite seu e-mail"
          />
        </div>
        <div class="input-group">
          <label for="senha">Senha</label>
          <input
            v-model="senha"
            type="password"
            id="senha"
            required
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" class="btn-login">Entrar</button>
        <p v-if="erro" class="error-message">{{ erro }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')

// Cookies para armazenar o token e o usuário admin
const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 * 30 }) // 30 dias
const userCookie = useCookie('user')

const handleLogin = async () => {
  erro.value = ''

  try {
    const { data, error } = await useFetch('https://api.promohawk.com.br/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: senha.value,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error.value) {
      erro.value = 'Erro na requisição ao servidor.'
      return
    }

    if (!data.value?.status) {
      erro.value = data.value?.message || 'E-mail ou senha inválidos.'
      return
    }

    if (!data.value.token) {
      erro.value = 'Token não recebido da API.'
      return
    }

    // Verifica se o usuário é admin (depende do formato da API)
    if (!data.value.user || data.value.user.role !== 'admin') {
      erro.value = 'Acesso negado. Apenas administradores.'
      return
    }

    // Armazena token e dados do usuário em cookie
    tokenCookie.value = data.value.token
    userCookie.value = data.value.user

    // Redireciona para a área admin
    router.push('/admin')
  } catch (err) {
    erro.value = 'Erro inesperado ao conectar com o servidor.'
    console.error(err)
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
  padding: 20px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: seagreen;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: darkgreen;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>



