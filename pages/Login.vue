<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h1>Acessar conta</h1>
        <p>Entre com seus dados para continuar</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-field">
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            required
            placeholder="exemplo@email.com"
            class="input-with-placeholder"
          />
          <label for="email">E-mail</label>
          <div class="underline"></div>
        </div>
        
        <div class="input-field">
          <input
            v-model="senha"
            type="password"
            id="senha"
            name="senha"
            required
            placeholder="Digite sua senha"
            class="input-with-placeholder"
          />
          <label for="senha">Senha</label>
          <div class="underline"></div>
        </div>
        
        <button type="submit" class="login-button">
          <span>Entrar</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <p v-if="erro" class="error-message">{{ erro }}</p>
        
        <div class="login-footer">
          <NuxtLink to="/esqueceu" class="footer-link">Esqueceu a senha?</NuxtLink>
          <NuxtLink to="/Cadastro" class="footer-link">Criar conta</NuxtLink>
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

const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 * 30 })
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

  if (!data.value?.status) {
    erro.value = data.value?.message || 'E-mail ou senha inválidos.'
    return
  }

  tokenCookie.value = data.value.token
  userCookie.value = data.value.user
 
  window.location.href = '/'
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 40px;
}

.login-header {
  margin-bottom: 32px;
  text-align: center;
}

.login-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  color: #666;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-field {
  position: relative;
}

.input-with-placeholder {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  outline: none;
  transition: all 0.3s;
  color: #555;
}

/* Estilo do placeholder mais visível */
.input-with-placeholder::placeholder {
  color: #999;
  opacity: 1;
  font-size: 14px;
  transition: all 0.2s;
}

.input-with-placeholder:focus::placeholder {
  color: #ccc;
}

.input-with-placeholder:focus {
  border-bottom-color: transparent;
}

.input-with-placeholder:focus + label,
.input-with-placeholder:not(:placeholder-shown) + label {
  transform: translateY(-20px);
  font-size: 12px;
  color: #222;
}

.input-field label {
  position: absolute;
  left: 0;
  top: 12px;
  color: #999;
  font-size: 16px;
  transition: all 0.3s;
  pointer-events: none;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #222;
  transition: width 0.3s;
}

.input-with-placeholder:focus ~ .underline {
  width: 100%;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-button:hover {
  background-color: #111;
  transform: translateY(-2px);
}

.login-button svg {
  transition: transform 0.3s;
}

.login-button:hover svg {
  transform: translateX(4px);
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin-top: -12px;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.footer-link {
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #222;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 20px;
  }
  
  .input-with-placeholder::placeholder {
    font-size: 13px;
  }
}
</style>