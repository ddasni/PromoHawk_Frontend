<template>
  <div class="page-center">
    <div class="esqueceu-container">
      <h2>Esqueceu a senha</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input v-model="email" type="email" id="email" required placeholder="Digite seu e-mail" />
        </div>

        <button type="submit" class="btn-esqueceu" :disabled="loading">
          {{ loading ? 'Enviando...' : 'Enviar Código' }}
        </button>

        <div v-if="message" :style="messageStyle">{{ message }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Usando o layout 'basic', onde não tem Header e Footer
definePageMeta({
  layout: 'basic',
})

import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
const message = ref('')
const messageStyle = ref({})

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  messageStyle.value = {}

  try {
    const response = await $fetch('/api/sendCode', {
      method: 'POST',
      body: { email: email.value }
    })

    if (response.success) {
      message.value = 'Código enviado! Verifique seu e-mail.'
      messageStyle.value = { color: 'green' }
      localStorage.setItem('codeId', response.codeId)
    }
  } catch (error) {
    message.value = 'Erro ao enviar o código.'
    messageStyle.value = { color: 'red' }
  } finally {
    loading.value = false
  }
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
