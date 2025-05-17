<template>
    <div class="page-center">
      <div class="cadastro-container">
        <h2>Cadastro</h2>
  
        <!-- Indicador de Etapas -->
        <div class="step-indicator">
          <div class="step" :class="{ active: etapa >= 1, complete: etapa > 1 }">
            <div class="circle">
              <span v-if="etapa > 1">✓</span>
              <span v-else>1</span>
            </div>
            <span class="label">Dados Pessoais</span>
          </div>
          <div class="line"></div>
          <div class="step" :class="{ active: etapa === 2 }">
            <div class="circle">
              <span>2</span>
            </div>
            <span class="label">Segurança</span>
          </div>
        </div>
  
        <!-- Etapa 1 -->
        <form v-if="etapa === 1" @submit.prevent="proximaEtapa">
          <div class="input-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" v-model="nome" required placeholder="Digite seu nome" />
          </div>
          <div class="input-group">
            <label for="nome-usuario">Usuário</label>
            <input type="text" id="nome-usuario" v-model="nomeUsuario" required placeholder="Digite o seu nome de usuário" />
          </div>
          <div class="input-group">
            <label for="telefone">Telefone</label>
            <input type="tel" v-model="telefone" placeholder="(XX) XXXXX-XXXX" required />
          </div>
          <div class="btns">
            <button type="submit" class="btn btn-proximo">Próximo</button>
          </div>
        </form>
  
        <!-- Etapa 2 -->
        <form v-if="etapa === 2" @submit.prevent="finalizarCadastro">
          <div class="input-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" required placeholder="Digite seu e-mail" />
          </div>
          <div class="input-group">
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="senha" required placeholder="Digite sua senha" />
          </div>
          <div class="btns">
            <button type="button" class="btn btn-voltar" @click="voltarEtapa">Voltar</button>
            <button type="submit" class="btn btn-finalizar">Finalizar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
definePageMeta({
  layout: 'basic',
})

import { useRouter } from 'vue-router'
const router = useRouter()


import { ref } from 'vue'
import { useFetch } from '#app'

const etapa = ref(1)

const nome = ref('')
const nomeUsuario = ref('')
const telefone = ref('')
const email = ref('')
const senha = ref('')

const loading = ref(false)
const erro = ref(null)

function proximaEtapa() {
  etapa.value = 2
}

function voltarEtapa() {
  etapa.value = 1
}

async function finalizarCadastro() {
  loading.value = true
  erro.value = null

  const { data, error } = await useFetch('https://api.promohawk.com.br/api/users', {
    method: 'POST',
    body: {
      nome: nome.value,
      username: nomeUsuario.value,
      telefone: telefone.value,
      email: email.value,
      password: senha.value,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  loading.value = false

  if (error.value) {
    erro.value = 'Erro ao cadastrar usuário. Verifique os dados.'
    console.error(error.value)
    return
  }

  alert('Cadastro realizado com sucesso!')
  router.push('/')
  etapa.value = 1
  nome.value = ''
  nomeUsuario.value = ''
  telefone.value = ''
  email.value = ''
  senha.value = ''
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
  
  .cadastro-container {
    background-color: #fff;
    padding: 30px 40px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    width: 100%;
    max-width: 480px;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  h2 {
    margin-bottom: 25px;
    color: #333;
  }
  
  /* === Etapas === */
  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    flex: 1;
  }
  
  .step .circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ddd;
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 6px;
    transition: all 0.3s ease;
    font-size: 15px;
  }
  
  .step.active .circle {
    background: #007bff;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  .step.complete .circle {
    background: #28a745;
  }
  
  .label {
    font-size: 13px;
    font-weight: 500;
    color: #888;
  }
  
  .step.active .label,
  .step.complete .label {
    color: #007bff;
    font-weight: 600;
  }
  
  .line {
    position: absolute;
    top: 18px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #ddd;
    z-index: 0;
  }
  
  .step.active ~ .line,
  .step.complete ~ .line {
    background: linear-gradient(to right, #007bff, #00c6ff);
  }
  
  /* === Inputs e Botões === */
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
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
  }
  
  .btns {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
  }
  
  .btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-proximo {
    background-color: #007bff;
    color: white;
  }
  
  .btn-proximo:hover {
    background-color: #0056b3;
  }
  
  .btn-voltar {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-voltar:hover {
    background-color: #5a6268;
  }
  
  .btn-finalizar {
    background-color: seagreen;
    color: white;
  }
  
  .btn-finalizar:hover {
    background-color: darkgreen;
  }
  </style>
   
  
