<template>
  <div class="register-page">
    <div class="register-card">
      <div class="register-header">
        <h1>Criar nova conta</h1>
        <p>Preencha seus dados para se cadastrar</p>
      </div>

      <!-- Stepper -->
      <ol class="relative flex justify-center w-full text-xs font-medium sm:text-base mb-8">
        <li class="flex items-center relative z-10">
          <div class="flex flex-col items-center">
            <span
              class="w-6 h-6 border-2 rounded-full flex justify-center items-center mb-2 text-sm lg:w-10 lg:h-10 transition-colors"
              :class="etapa >= 1 ? 'bg-gray-800 text-white border-transparent' : 'bg-white border-gray-300 text-gray-500'"
            >
              1
            </span>
            <span class="text-gray-600" :class="etapa >= 1 ? 'text-gray-900 font-semibold' : ''">Dados Pessoais</span>
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
            <span class="text-gray-600" :class="etapa >= 2 ? 'text-gray-900 font-semibold' : ''">Segurança</span>
          </div>
        </li>
      </ol>

      <!-- Etapa 1 - Dados Pessoais -->
      <div v-if="etapa === 1" class="register-form">
        <div class="input-field">
          <input
            v-model="nome"
            type="text"
            id="nome"
            required
            placeholder="Ronaldo Silva"
            class="input-with-placeholder"
            @blur="validarCampo('nome')"
          />
          <label for="nome">Nome Completo</label>
          <div class="underline"></div>
          <span v-if="mostrarErro('nome')" class="error-message">{{ erros.nome }}</span>
        </div>
        
        <div class="input-field">
          <input
            v-model="nomeUsuario"
            type="text"
            id="nome-usuario"
            required
            placeholder="ronaldinho"
            class="input-with-placeholder"
            @blur="validarCampo('nomeUsuario')"
          />
          <label for="nome-usuario">Nome de Usuário</label>
          <div class="underline"></div>
          <span v-if="mostrarErro('nomeUsuario')" class="error-message">{{ erros.nomeUsuario }}</span>
        </div>
        
        <div class="input-field">
          <input
            v-model="telefone"
            type="tel"
            required
            placeholder="(11) 99999-9999"
            class="input-with-placeholder"
            @blur="validarCampo('telefone')"
            @input="validarTelefoneEmTempoReal"
            v-maska="'(##) #####-####'"
          />
          <label for="telefone">Telefone</label>
          <div class="underline"></div>
          <span v-if="mostrarErro('telefone')" class="error-message">{{ erros.telefone }}</span>
        </div>
        
        <button 
          type="button" 
          class="submit-button"
          @click="proximaEtapa"
          :disabled="!etapa1Valida"
        >
          <span>Próxima Etapa</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Etapa 2 - Segurança -->
      <div v-if="etapa === 2" class="register-form">
        <div class="input-field">
          <input
            v-model="email"
            type="email"
            required
            placeholder="exemplo@email.com"
            class="input-with-placeholder"
            @blur="validarCampo('email')"
          />
          <label for="email">E-mail</label>
          <div class="underline"></div>
          <span v-if="mostrarErro('email')" class="error-message">{{ erros.email }}</span>
        </div>
        
        <div class="input-field">
          <input
            v-model="senha"
            type="password"
            required
            placeholder="Mínimo 6 caracteres"
            class="input-with-placeholder"
            @blur="validarCampo('senha')"
            @input="validarSenhaEmTempoReal"
          />
          <label for="senha">Senha</label>
          <div class="underline"></div>
          <span v-if="mostrarErro('senha')" class="error-message">{{ erros.senha }}</span>
        </div>
        
        <div class="action-buttons">
          <button 
            type="button" 
            class="secondary-button"
            @click="voltarEtapa"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Voltar</span>
          </button>
          
          <button 
            type="button" 
            class="submit-button"
            @click="finalizarCadastro"
            :disabled="!etapa2Valida || loading"
          >
            <span v-if="!loading">Finalizar Cadastro</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </div>
      </div>

      <!-- Notificação -->
      <div v-if="notificacao.mostrar" class="notification" :class="notificacao.tipo">
        <div class="notification-content">
          <h3>{{ notificacao.titulo }}</h3>
          <p>{{ notificacao.mensagem }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'basic',
})

// Dados do formulário
const etapa = ref(1)
const nome = ref('')
const nomeUsuario = ref('')
const telefone = ref('')
const email = ref('')
const senha = ref('')
const loading = ref(false)

// Sistema de notificação
const notificacao = ref({
  mostrar: false,
  tipo: '', // 'sucesso' ou 'erro'
  titulo: '',
  mensagem: ''
})

function mostrarNotificacao(tipo, titulo, mensagem) {
  notificacao.value = {
    mostrar: true,
    tipo,
    titulo,
    mensagem
  }
  setTimeout(() => {
    notificacao.value.mostrar = false
  }, 3000)
}

// Validação
const etapa1Valida = ref(false)
const etapa2Valida = ref(false)
const erros = ref({
  nome: '',
  nomeUsuario: '',
  telefone: '',
  email: '',
  senha: ''
})

// Controle de campos tocados
const camposTocados = ref({
  nome: false,
  nomeUsuario: false,
  telefone: false,
  email: false,
  senha: false
})

function validarTelefoneEmTempoReal() {
  const telefoneNumeros = telefone.value.replace(/\D/g, '')
  if (telefoneNumeros.length === 11) {
    erros.value.telefone = ''
    etapa1Valida.value = validarEtapa1()
  }
}

function validarSenhaEmTempoReal() {
  if (senha.value.length >= 6) {
    erros.value.senha = ''
    etapa2Valida.value = validarEtapa2()
  }
}

// Máscara para telefone (requer a lib v-maska)
const vMaska = {
  mounted(el, binding) {
    el.addEventListener('input', () => {
      const mask = binding.value
      let value = el.value.replace(/\D/g, '')
      let maskedValue = ''
      
      if (mask === '(##) #####-####') {
        if (value.length > 0) maskedValue += '(' + value.substring(0, 2)
        if (value.length > 2) maskedValue += ') ' + value.substring(2, 7)
        if (value.length > 7) maskedValue += '-' + value.substring(7, 11)
      }
      
      el.value = maskedValue
    })
  }
}

function mostrarErro(campo) {
  return camposTocados.value[campo] && erros.value[campo]
}

function validarCampo(campo) {
  camposTocados.value[campo] = true
  
  switch(campo) {
    case 'nome':
      if (!nome.value.trim()) {
        erros.value.nome = 'Nome completo é obrigatório'
        return false
      }
      erros.value.nome = ''
      return true
      
    case 'nomeUsuario':
      if (!nomeUsuario.value.trim()) {
        erros.value.nomeUsuario = 'Nome de usuário é obrigatório'
        return false
      } else if (nomeUsuario.value.length < 3) {
        erros.value.nomeUsuario = 'Mínimo 3 caracteres'
        return false
      }
      erros.value.nomeUsuario = ''
      return true
      
    case 'telefone':
      const telefoneNumeros = telefone.value.replace(/\D/g, '')
      if (!telefoneNumeros) {
        erros.value.telefone = 'Telefone é obrigatório'
        return false
      } else if (telefoneNumeros.length < 11) {
        erros.value.telefone = 'Telefone inválido'
        return false
      }
      erros.value.telefone = ''
      return true
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value.trim()) {
        erros.value.email = 'E-mail é obrigatório'
        return false
      } else if (!emailRegex.test(email.value)) {
        erros.value.email = 'E-mail inválido'
        return false
      }
      erros.value.email = ''
      return true
      
    case 'senha':
      if (!senha.value.trim()) {
        erros.value.senha = 'Senha é obrigatória'
        return false
      } else if (senha.value.length < 6) {
        erros.value.senha = 'Mínimo 6 caracteres'
        return false
      }
      erros.value.senha = ''
      return true
  }
  
  if (etapa.value === 1) {
    etapa1Valida.value = validarEtapa1()
  } else {
    etapa2Valida.value = validarEtapa2()
  }
}

function validarEtapa1() {
  const nomeValido = validarCampo('nome')
  const usuarioValido = validarCampo('nomeUsuario')
  const telefoneValido = validarCampo('telefone')
  return nomeValido && usuarioValido && telefoneValido
}

function validarEtapa2() {
  const emailValido = validarCampo('email')
  const senhaValida = validarCampo('senha')
  return emailValido && senhaValida
}

function proximaEtapa() {
  camposTocados.value = {
    nome: true,
    nomeUsuario: true,
    telefone: true,
    email: true,
    senha: true
  }
  
  if (validarEtapa1()) {
    etapa.value = 2
  }
}

function voltarEtapa() {
  etapa.value = 1
}

async function finalizarCadastro() {
  camposTocados.value = {
    nome: true,
    nomeUsuario: true,
    telefone: true,
    email: true,
    senha: true
  }
  
  if (!validarEtapa2()) return
  
  loading.value = true

  try {
    const { data, error } = await useFetch('https://api.promohawk.com.br/api/users', {
      method: 'POST',
      body: {
        nome: nome.value,
        username: nomeUsuario.value,
        telefone: telefone.value.replace(/\D/g, ''),
        email: email.value,
        password: senha.value,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error.value) {
      throw error.value
    }

    mostrarNotificacao('sucesso', 'Sucesso!', 'Cadastro realizado com sucesso! Redirecionando...')
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
  } catch (error) {
    mostrarNotificacao('erro', 'Erro', error.value?.data?.message || 'Erro ao cadastrar usuário. Verifique os dados.')
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 460px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 40px;
}

.register-header {
  margin-bottom: 32px;
  text-align: center;
}

.register-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.register-header p {
  font-size: 14px;
  color: #666;
}

.stepper {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 32px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  list-style: none;
}

.stepper li {
  display: flex;
  align-items: center;
  color: #6b7280;
  flex: 1;
}

.stepper li:last-child svg {
  display: none;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-field {
  position: relative;
  margin-bottom: 16px;
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

.error-message {
  position: absolute;
  bottom: -18px;
  left: 0;
  font-size: 12px;
  color: #ef4444;
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
  background-color: #ccc;
}

.submit-button svg {
  transition: transform 0.3s;
}

.submit-button:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.secondary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background-color: transparent;
  color: #222;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-button:hover {
  background-color: #f5f5f5;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.action-buttons .submit-button {
  margin-top: 0;
  flex: 2;
}

.action-buttons .secondary-button {
  flex: 1;
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
  border-left: 4px solid;
}

.notification.error {
  background-color: #fef2f2;
  border-left-color: #ef4444;
}

.notification.sucesso {
  background-color: #f0fdf4;
  border-left-color: #10b981;
}

.notification-content h3 {
  color: #111;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
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
  .register-card {
    padding: 30px 20px;
  }
  
  .register-header h1 {
    font-size: 20px;
  }
  
  .stepper {
    font-size: 12px;
    padding: 8px 12px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons .submit-button,
  .action-buttons .secondary-button {
    width: 100%;
  }
}
</style>