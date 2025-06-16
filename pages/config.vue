<template>
  <div class="config-container">
    <h1 class="titulo">Configurações da Conta</h1>

    <!-- Notificações -->
    <div class="config-section">
      <h2 class="secao-titulo">Notificações</h2>

      <SwitchItem label="Alertas de queda de preço" v-model="alertaQuedaPreco" />
      <SwitchItem label="Notificar novos cupons e ofertas" v-model="alertaOfertas" />
      <SwitchItem label="Alertas de variação de preço significativa" v-model="alertaVariaPreco" />
      <SwitchItem label="Receber notificações por email" v-model="notificarPorEmail" />
    </div>

    <!-- Preferências de Navegação -->
    <div class="config-section">
      <h2 class="secao-titulo">Preferências de Navegação</h2>

      
      <SwitchItem label="Ativar histórico de buscas" v-model="historicoBuscas" />
    </div>


    <!-- Dados e Privacidade -->
    <div class="config-section">
      <h2 class="secao-titulo">Dados e Privacidade</h2>

      <SwitchItem label="Limpar histórico de buscas automaticamente" v-model="limparHistoricoAuto" />
      <SwitchItem label="Permitir coleta de dados para melhorias" v-model="permitirColetaDados" />
    </div>

    <!-- Ações -->
    <div class="config-actions">
      <button @click="salvarConfiguracoes" class="btn-salvar">
        Salvar Configurações
      </button>

      <transition name="fade">
        <p v-if="showSavedMessage" class="saved-message">
          ✅ Configurações salvas com sucesso!
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'
import SwitchItem from '@/components/SwitchItem.vue'

// Notificações
const alertaQuedaPreco = ref(true)
const alertaOfertas = ref(true)
const alertaVariaPreco = ref(true)
const notificarPorEmail = ref(true)

// Preferências de navegação
const somenteEstoque = ref(false)
const filtrarFreteGratis = ref(false)
const priorizarLojasConfiaveis = ref(true)
const historicoBuscas = ref(true)

// Preferências de lojas
const mostrarLojasFavoritas = ref(true)
const ocultarLojasIndesejadas = ref(false)

// Dados e privacidade
const limparHistoricoAuto = ref(false)
const permitirColetaDados = ref(true)

// Mensagem de sucesso
const showSavedMessage = ref(false)

// Função para salvar
function salvarConfiguracoes() {
  console.log('Configurações salvas:', {
    alertaQuedaPreco: alertaQuedaPreco.value,
    alertaOfertas: alertaOfertas.value,
    alertaVariaPreco: alertaVariaPreco.value,
    notificarPorEmail: notificarPorEmail.value,
    somenteEstoque: somenteEstoque.value,
    filtrarFreteGratis: filtrarFreteGratis.value,
    priorizarLojasConfiaveis: priorizarLojasConfiaveis.value,
    historicoBuscas: historicoBuscas.value,
    mostrarLojasFavoritas: mostrarLojasFavoritas.value,
    ocultarLojasIndesejadas: ocultarLojasIndesejadas.value,
    limparHistoricoAuto: limparHistoricoAuto.value,
    permitirColetaDados: permitirColetaDados.value,
  })

  showSavedMessage.value = true
  setTimeout(() => (showSavedMessage.value = false), 3000)
}
</script>

<style scoped>
/* Mantém o mesmo style anterior porque ele já estava muito bom */
.config-container {
  max-width: 750px;
  margin: 40px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

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

.saved-message {
  color: #28a745;
  margin-top: 20px;
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>




