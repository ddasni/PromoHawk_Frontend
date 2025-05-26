<template>
  <div class="page-center">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
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
            name="senha"
            required
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" class="btn-login">Entrar</button>
        <p v-if="erro" style="color: red; margin-top: 10px;">{{ erro }}</p>
        <div class="links">
          <NuxtLink to="/esqueceu">Esqueceu a senha?</NuxtLink><br>
          <NuxtLink to="/Cadastro">Cadastrar-se</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'basic',
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')


// Cookies definidos fora da função para garantir consistência entre SSR/CSR
const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 * 30 }) // 30 dias
const userCookie = useCookie('user')


const handleLogin = async () => {
  erro.value = ''

  const { data, error } = await useFetch('https://api.promohawk.com.br/api/auth/login', {
    method: 'POST',
    body: {
      email: email.value,
      password: senha.value,
    },
    headers: {
      'Content-Type': 'application/json',
    }
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

  // Armazena o token e os dados do usuário
  tokenCookie.value = data.value.token
  userCookie.value = data.value.user


  // Redirecionar para a home
  router.push('/')
}
</script>







<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura da viewport inteira */
  background-color: #f4f4f9;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
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

.links {
  margin-top: 10px;
}

.links a {
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>

