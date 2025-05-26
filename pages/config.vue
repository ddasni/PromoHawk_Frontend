<template>
  <div class="config-container">
    <h1 class="titulo">Configurações</h1>

    <!-- Notificações -->
    <div class="config-section">
      <h2 class="secao-titulo">Notificações</h2>

      <SwitchItem label="Receber notificações de queda de preço" v-model="notificacoesAtivadas" />
      <SwitchItem label="Receber por Email" v-model="notificarPorEmail" />


      <div class="config-item">
        <label>Frequência de notificação</label>
        <select v-model="frequenciaNotificacao" class="select">
          <option value="imediato">Imediato</option>
          <option value="diario">Diariamente</option>
          <option value="semanal">Semanalmente</option>
        </select>
      </div>
    </div>

    <!-- Preferências -->
    <div class="config-section">
      <h2 class="secao-titulo">Preferências</h2>

      <SwitchItem label="Receber promoções e ofertas personalizadas" v-model="ofertasPersonalizadas" />
      <SwitchItem label="Permitir recomendações personalizadas" v-model="recomendacoes" />
      <SwitchItem label="Ativar histórico de buscas" v-model="historicoBuscas" />
    </div>


    <!-- Ações -->
    <div class="config-actions">
      <button @click="salvarConfiguracoes" class="btn-salvar">Salvar Configurações</button>

      <transition name="fade">
        <p v-if="showSavedMessage" class="saved-message">
           Configurações salvas com sucesso!
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup>
// pagina protegida por meio do token de login
definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'
import SwitchItem from '@/components/SwitchItem.vue'


// Notificações
const notificacoesAtivadas = ref(true)
const notificarPorEmail = ref(true)
const frequenciaNotificacao = ref('imediato')

// Preferências
const ofertasPersonalizadas = ref(true)
const recomendacoes = ref(true)
const historicoBuscas = ref(true)


// Mensagem de sucesso
const showSavedMessage = ref(false)

// Função para salvar
function salvarConfiguracoes() {
  console.log('Configurações salvas:', {
    notificacoesAtivadas: notificacoesAtivadas.value,
    notificarPorEmail: notificarPorEmail.value,
    frequenciaNotificacao: frequenciaNotificacao.value,
    ofertasPersonalizadas: ofertasPersonalizadas.value,
    recomendacoes: recomendacoes.value,
    historicoBuscas: historicoBuscas.value,
  
  })

  showSavedMessage.value = true
  setTimeout(() => (showSavedMessage.value = false), 3000)
}
</script>

<style scoped>
/* Layout Geral */
.config-container {
  max-width: 750px;
  margin: 40px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

/* Títulos */
.titulo {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
}

.secao-titulo {
  font-size: 22px;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 20px;
}

/* Itens */
.config-section {
  margin-bottom: 40px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.select {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
}

/* Botões */
.config-actions {
  text-align: center;
  margin-top: 30px;
}

.btn-salvar {
  padding: 14px 30px;
  background-color: #007bff;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-salvar:hover {
  background-color: #0056b3;
}

/* Mensagem de salvo */
.saved-message {
  color: #28a745;
  margin-top: 20px;
  font-weight: 600;
}

/* Animações */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>


