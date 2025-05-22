<template>
  <div class="page-center">
    <div class="esqueceu-container">
      <div class="step" :class="{ active: etapa >= 1, complete: etapa > 1 }">
        <h2>Esqueceu a senha</h2>
      </div>

      <!-- Etapa 1 -->
      <div v-if="etapa === 1">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input v-model="email" type="email" id="email" required placeholder="Digite seu e-mail" />
        </div>
        <div>
          <Botao class="btn-esqueceu" :disabled="loading" 
            @click="enviarEmail"
            nome="Continuar"
          />
        </div>
      </div>

      <!-- Etapa 2 -->
      <div v-if="etapa === 2">
        <div class="input-group">
          <label for="password">Nova Senha</label>
          <input v-model="password" type="password" id="password" required placeholder="Digite sua nova senha" />
        </div>
        <div class="input-group">
          <label for="confirmar_password">Confirmar Senha</label>
          <input v-model="password_confirmation" type="password" id="password_confirmation" required placeholder="Confirme sua senha" />
        </div>
        <div>
          <Botao class="btn-esqueceu" :disabled="loading"
            @click="novaSenha"
            nome="Finalizar"
          />
        </div>
      </div>

      <div v-if="message" :style="messageStyle">{{ message }}</div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'basic' })

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Botao from '~/components/Common/botao.vue' // <-- importando o componente Botao
import { useAuth } from '~/composables/useAuth' // <-- importando o composable Auth.js

const etapa = ref(1)
const email = ref('')
const token = ref('')
const password = ref('')
const password_confirmation = ref('')
const loading = ref(false)
const message = ref('')
const messageStyle = ref({})
const route = useRoute()
const router = useRouter()

// useAuth retorna tudo que precisamos
const { forgotPassword, resetPassword } = useAuth()

// Extrai o email e token da url da pagina carregada pelo link do email
onMounted(() => {
  const urlToken = route.query.token
  const urlEmail = route.query.email

  if (urlToken && urlEmail) {
    token.value = decodeURIComponent(urlToken)
    email.value = decodeURIComponent(urlEmail)
    etapa.value = 2
  }
})

async function enviarEmail() {
  loading.value = true
  message.value = ''
  messageStyle.value = {}

  try {
    await forgotPassword(email.value)
    message.value = 'E-mail de recuperação enviado!'
    messageStyle.value = { color: 'green' }
  } catch (error) {
    message.value = 'Erro ao enviar o e-mail.'
    messageStyle.value = { color: 'red' }
  }

  loading.value = false
}

async function novaSenha() {
  loading.value = true
  message.value = ''
  messageStyle.value = {}

  if (password.value.trim() !== password_confirmation.value.trim()) {
    message.value = 'As senhas não coincidem.'
    messageStyle.value = { color: 'red' }
    loading.value = false
    return
  }

  try {
    await resetPassword({
      email: email.value,
      token: token.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })

    message.value = 'Senha redefinida com sucesso!'
    messageStyle.value = { color: 'green' }

    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    message.value = 'Erro ao redefinir a senha.'
    messageStyle.value = { color: 'red' }
  }

  loading.value = false
}
</script>



<style scoped>
.page-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
}

.esqueceu-container {
  background-color: #fff;
  padding: 30px 25px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.input-group {
  margin-bottom: 18px;
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
  border-radius: 6px;
  font-size: 14px;
}

.btn-esqueceu {
  width: 100%;
  padding: 12px;
  background-color: seagreen;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-esqueceu:hover {
  background-color: darkgreen;
}

.message {
  margin-top: 10px;
  font-size: 14px;
}
</style>
