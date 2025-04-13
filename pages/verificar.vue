<template>
  <div class="verificar-codigo-container">
    <h2>Verifique seu Código</h2>
    <form @submit.prevent="handleVerify">
      <div class="input-group">
        <label for="code">Código de verificação</label>
        <input v-model="code" type="text" id="code" required placeholder="Digite o código enviado por e-mail" />
      </div>

      <button type="submit" class="btn-verificar" :disabled="loading">
        {{ loading ? 'Verificando...' : 'Verificar Código' }}
      </button>

      <div v-if="message" :style="messageStyle">{{ message }}</div>
    </form>
  </div>
</template>


<script setup>
// Usando o layout 'basic', onde não tem Header e Footer
definePageMeta({
  layout: 'basic',
})


import { ref } from 'vue'

const code = ref('')
const loading = ref(false)
const message = ref('')
const messageStyle = ref({})

const handleVerify = async () => {
  loading.value = true
  message.value = ''
  messageStyle.value = {}

  const codeId = localStorage.getItem('codeId')

  try {
    const response = await $fetch('/api/verifyCode', {
      method: 'POST',
      body: { code: code.value, codeId }
    })

    if (response.success) {
      message.value = 'Código verificado com sucesso! Você pode agora alterar sua senha.'
      messageStyle.value = { color: 'green' }
      // Redirecionar para a página de alterar senha
      setTimeout(() => {
        useRouter().push('/alterar-senha')
      }, 2000)
    }
  } catch (error) {
    message.value = 'Código inválido.'
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

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
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

.btn {
  width: 100%;
  padding: 10px;
  background-color: seagreen;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: darkgreen;
}
</style>
