<template>
  <div class="container">
    <h2>Alterar Senha</h2>
    <form @submit.prevent="handleChangePassword">
      <div class="input-group">
        <label for="newPassword">Nova Senha</label>
        <input v-model="newPassword" type="password" id="newPassword" required />
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirmar Nova Senha</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required />
      </div>
      <button :disabled="loading" class="btn">
        {{ loading ? 'Alterando...' : 'Alterar Senha' }}
      </button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
// Usando o layout 'basic', onde não tem Header e Footer
definePageMeta({
  layout: 'basic',
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const handleChangePassword = async () => {
  loading.value = true
  error.value = ''

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem.'
    loading.value = false
    return
  }

  try {
    // Aqui você implementaria a lógica de alteração de senha no backend
    // Exemplo:
    // const response = await $fetch('/api/changePassword', { ... })

    // Suponhamos que a alteração de senha seja bem-sucedida
    alert('Senha alterada com sucesso!')
    router.push('/login') // Redireciona para a página de login após a alteração
  } catch (err) {
    error.value = 'Erro ao alterar a senha. Tente novamente.'
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

.error {
  margin-top: 10px;
  color: red;
}
</style>
