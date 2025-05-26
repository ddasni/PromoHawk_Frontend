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
          <label for="password_confirmation">Confirmar Senha</label>
          <input v-model="password_confirmation" type="password" id="password_confirmation" required placeholder="Confirme sua senha" />
        </div>
        <div>
          <Botao class="btn-esqueceu" :disabled="loading"
            @click="novaSenha"
            nome="Finalizar"
          />
        </div>

        <UAlert
          v-if="message"
          :title="alertTitle"
          :description="message"
          :color="alertColor"
          variant="subtle"
          class="mt-4"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'basic' })

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Botao from '~/components/Common/botao.vue'

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
const alertTitle = ref('')
const alertColor = ref('primary') // Pode ser: primary, red, green, yellow, etc.


const API_URL = 'https://api.promohawk.com.br/api/auth'

onMounted(() => {
  const urlToken = route.query.token
  const urlEmail = route.query.email

  if (urlToken && urlEmail) {
    token.value = urlToken
    email.value = urlEmail
    etapa.value = 2
  }
})

async function enviarEmail() {
  loading.value = true
  message.value = ''
  messageStyle.value = {}

  try {
  await $fetch(`${API_URL}/forgot-password`, {
    method: 'POST',
    body: { email: email.value }
  })

    message.value = 'E-mail de recuperação enviado!'
    alertTitle.value = 'Sucesso!'
    alertColor.value = 'green'

  }catch(error) {
    message.value = 'Erro ao enviar o e-mail.'
    alertTitle.value = 'Erro'
    alertColor.value = 'red'
  }

  loading.value = false
}

async function novaSenha() {
  loading.value = true
  message.value = ''
  messageStyle.value = {}

  if (password.value !== password_confirmation.value) {
    message.value = 'As senhas não coincidem.'
    messageStyle.value = { color: 'red' }
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

    message.value = 'Senha redefinida com sucesso!'
    alertTitle.value = 'Sucesso!'
    alertColor.value = 'green'

    setTimeout(() => {
      router.push('/login').catch((error) => {
        console.error('Erro ao redirecionar:', error)
      })
    }, 2000)
  } catch (error) {
    message.value = 'Erro ao redefinir a senha.'
    alertTitle.value = 'Erro'
    alertColor.value = 'red'
  }

  loading.value = false

  console.log('password:', password.value)
  console.log('password_confirmation:', password_confirmation.value)
  console.log('Token:', token.value)
  console.log('Email:', email.value)
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
