<template>
  <div class="forgot-page">
    <div class="forgot-card">
      <!-- Etapa 1 - Solicitação de e-mail -->
      <div v-if="etapa === 1" class="forgot-form">
        <div class="form-header">
          <h1>Redefinir senha</h1>
          <p>Digite o e-mail associado à sua conta</p>
        </div>
        
        <!-- Stepper movido para cá -->
        <ol class="relative flex justify-center w-full text-xs font-medium sm:text-base mb-8">
          <li class="flex items-center relative z-10">
            <div class="flex flex-col items-center">
              <span
                class="w-6 h-6 border-2 rounded-full flex justify-center items-center mb-2 text-sm lg:w-10 lg:h-10 transition-colors"
                :class="etapa >= 1 ? 'bg-gray-800 text-white border-transparent' : 'bg-white border-gray-300 text-gray-500'"
              >
                1
              </span>
              <span class="text-gray-600" :class="etapa >= 1 ? 'text-gray-900 font-semibold' : ''">Verificação</span>
            </div>
          </li>

          <!-- linha entre os steps -->
          <li class="absolute top-5 left-1/2 w-1/2 h-px z-0 transform -translate-x-1/2" 
              :class="etapa >= 2 ? 'bg-gray-800' : 'bg-gray-200'"></li>

          <li class="flex items-center ml-20 relative z-10">
            <div class="flex flex-col items-center">
              <span
                class="w-6 h-6 border-2 rounded-full flex justify-center items-center mb-2 text-sm lg:w-10 lg:h-10 transition-colors"
                :class="etapa >= 2 ? 'bg-gray-800 text-white border-transparent' : 'bg-white border-gray-300 text-gray-500'"
              >
                2
              </span>
              <span class="text-gray-600" :class="etapa >= 2 ? 'text-gray-900 font-semibold' : ''">Nova Senha</span>
            </div>
          </li>
        </ol>
        
        <div class="input-field">
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="exemplo@email.com"
            :disabled="loading"
            class="input-with-placeholder"
          />
          <label for="email">E-mail</label>
          <div class="underline"></div>
        </div>
        
        <button 
          type="button" 
          class="submit-button"
          @click="enviarEmail"
          :disabled="loading"
        >
          <span v-if="!loading">Continuar</span>
          <span v-else class="loading-spinner"></span>
          <svg v-if="!loading" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Etapa 2 - Nova senha -->
      <div v-if="etapa === 2" class="forgot-form">
        <div class="form-header">
          <h1>Crie uma nova senha</h1>
          <p>Digite e confirme sua nova senha</p>
        </div>
        
        <!-- Stepper movido para cá -->
        <ol class="relative flex justify-center w-full text-xs font-medium sm:text-base mb-8">
          <li class="flex items-center relative z-10">
            <div class="flex flex-col items-center">
              <span
                class="w-6 h-6 border-2 rounded-full flex justify-center items-center mb-2 text-sm lg:w-10 lg:h-10 transition-colors"
                :class="etapa >= 1 ? 'bg-gray-800 text-white border-transparent' : 'bg-white border-gray-300 text-gray-500'"
              >
                1
              </span>
              <span class="text-gray-600" :class="etapa >= 1 ? 'text-gray-900 font-semibold' : ''">Verificação</span>
            </div>
          </li>

          <!-- linha entre os steps -->
          <li class="absolute top-5 left-1/2 w-1/2 h-px z-0 transform -translate-x-1/2" 
              :class="etapa >= 2 ? 'bg-gray-800' : 'bg-gray-200'"></li>

          <li class="flex items-center ml-20 relative z-10">
            <div class="flex flex-col items-center">
              <span
                class="w-6 h-6 border-2 rounded-full flex justify-center items-center mb-2 text-sm lg:w-10 lg:h-10 transition-colors"
                :class="etapa >= 2 ? 'bg-gray-800 text-white border-transparent' : 'bg-white border-gray-300 text-gray-500'"
              >
                2
              </span>
              <span class="text-gray-600" :class="etapa >= 2 ? 'text-gray-900 font-semibold' : ''">Nova Senha</span>
            </div>
          </li>
        </ol>
        
        <div class="input-field">
          <input
            v-model="password"
            type="password"
            id="password"
            required
            placeholder="Mínimo 8 caracteres"
            class="input-with-placeholder"
          />
          <label for="password">Nova Senha</label>
          <div class="underline"></div>
        </div>
        
        <div class="input-field">
          <input
            v-model="password_confirmation"
            type="password"
            id="password_confirmation"
            required
            placeholder="Confirme sua senha"
            class="input-with-placeholder"
          />
          <label for="password_confirmation">Confirmar Senha</label>
          <div class="underline"></div>
        </div>
        
        <button 
          type="button" 
          class="submit-button"
          @click="novaSenha"
          :disabled="loading"
        >
          <span v-if="!loading">Redefinir Senha</span>
          <span v-else class="loading-spinner"></span>
          <svg v-if="!loading" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Notificação -->
      <div v-if="message" class="notification" :class="alertColor">
        <div class="notification-content">
          <h3>{{ alertTitle }}</h3>
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'basic' })

import { useCookie } from '#app'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const etapa = ref(1)
const email = ref('')
const token = ref('')
const password = ref('')
const password_confirmation = ref('')
const loading = ref(false)
const message = ref('')
const route = useRoute()
const router = useRouter()
const alertTitle = ref('')
const alertColor = ref('info')

// cookies de login
const tokenCookie = useCookie('token')
const userCookie = useCookie('user')

const API_URL = 'https://api.promohawk.com.br/api/auth'

onMounted(() => {
  const urlToken = route.query.token
  const urlEmail = route.query.email

  // Se o usuário já estiver logado e não estiver acessando via token (ou seja, digitou /esqueceu direto), redireciona
  if (tokenCookie.value && userCookie.value && !urlToken) {
    router.push('/')
    return
  }

  // Se veio pelo link do e-mail (token e email), ativa a etapa 2
  if (urlToken && urlEmail) {
    token.value = urlToken
    email.value = urlEmail
    etapa.value = 2
  }
})

async function enviarEmail() {
  loading.value = true
  message.value = ''
  
  try {
    await $fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      body: { email: email.value }
    })

    message.value = 'Enviamos um e-mail com instruções para redefinir sua senha.'
    alertTitle.value = 'E-mail enviado!'
    alertColor.value = 'success'
  } catch (error) {
    message.value = 'Ocorreu um erro ao enviar o e-mail. Verifique o endereço e tente novamente.'
    alertTitle.value = 'Erro'
    alertColor.value = 'error'
  } finally {
    loading.value = false
  }
}

async function novaSenha() {
  loading.value = true
  message.value = ''

  if (password.value !== password_confirmation.value) {
    message.value = 'As senhas não coincidem.'
    alertTitle.value = 'Atenção'
    alertColor.value = 'warning'
    loading.value = false
    return
  }

  try {
    await $fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        token: token.value
      }
    })

    message.value = 'Senha redefinida com sucesso! Redirecionando para login...'
    alertTitle.value = 'Sucesso!'
    alertColor.value = 'success'

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    message.value = 'Erro ao redefinir a senha. O token pode ter expirado.'
    alertTitle.value = 'Erro'
    alertColor.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 20px;
}

.forgot-card {
  width: 100%;
  max-width: 460px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 40px;
}

.form-header {
  margin-bottom: 32px;
  text-align: center;
}

.form-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.form-header p {
  font-size: 14px;
  color: #666;
}

.input-field {
  position: relative;
  margin-bottom: 24px;
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
  color: #555; /* Cor mais escura para o texto digitado */
}

/* Estilo específico para o placeholder */
.input-with-placeholder::placeholder {
  color: #999; /* Cinza médio para melhor visibilidade */
  opacity: 1; /* Garante que o Firefox mostre com a opacidade correta */
  font-size: 14px; /* Tamanho ligeiramente menor */
  transition: all 0.2s;
}

.input-with-placeholder:focus::placeholder {
  color: #ccc; /* Clareia quando em foco */
}

.input-field input:focus {
  border-bottom-color: transparent;
}

.input-field input:focus + label,
.input-field input:not(:placeholder-shown) + label {
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

.input-field input:focus ~ .underline {
  width: 100%;
}

.submit-button {
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
  margin-top: 16px;
}

.submit-button:hover:not(:disabled) {
  background-color: #111;
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-button svg {
  transition: transform 0.3s;
}

.submit-button:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.notification {
  margin-top: 24px;
  padding: 16px;
  border-radius: 8px;
  animation: fadeIn 0.3s ease-out;
}

.notification.success {
  background-color: #f0fdf4;
  border-left: 4px solid #10b981;
}

.notification.error {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
}

.notification.warning {
  background-color: #fffbeb;
  border-left: 4px solid #f59e0b;
}

.notification.info {
  background-color: #eff6ff;
  border-left: 4px solid #3b82f6;
}

.notification-content h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #3a3a3a;
}

.notification-content p {
  font-size: 14px;
  color: #555;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .forgot-card {
    padding: 30px 20px;
  }
  
  .form-header h1 {
    font-size: 20px;
  }
  
  .progress-steps {
    gap: 4px;
  }
  
  .step-label {
    font-size: 10px;
  }
}
</style>