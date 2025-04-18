<template>
  <div class="config-container">
    <h1 class="titulo">Configurações</h1>

    <div class="config-section">
      <h2 class="secao-titulo">Notificações</h2>

      <div class="config-item">
        <label class="label-switch">Receber notificações de queda de preço</label>
        <input type="checkbox" v-model="notificacoesAtivadas" class="switch" />
      </div>

      <div class="config-item">
        <label class="label-switch">Receber por Email</label>
        <input type="checkbox" v-model="notificarPorEmail" class="switch" />
      </div>

      <div class="config-item">
        <label class="label-switch">Receber por Push</label>
        <input type="checkbox" v-model="notificarPorPush" class="switch" />
      </div>

      <div class="config-item">
        <label>Frequência de notificação</label>
        <select v-model="frequenciaNotificacao" class="select">
          <option value="imediato">Imediato</option>
          <option value="diario">Diariamente</option>
          <option value="semanal">Semanalmente</option>
        </select>
      </div>

      <div class="config-item">
        <label class="label-switch">Receber promoções e ofertas personalizadas</label>
        <input type="checkbox" v-model="ofertasPersonalizadas" class="switch" />
      </div>
    </div>

    <div class="config-section">
      <h2 class="secao-titulo">Preferências gerais</h2>

      <div class="config-item">
        <label>Idioma preferido</label>
        <select v-model="idioma" class="select">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
        </select>
      </div>
    </div>

    <div class="config-actions">
      <button @click="salvarConfiguracoes" class="btn-salvar">Salvar Configurações</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notificacoesAtivadas = ref(true);
const notificarPorEmail = ref(true);
const notificarPorPush = ref(false);
const frequenciaNotificacao = ref('imediato');
const ofertasPersonalizadas = ref(true);
const idioma = ref('pt');

function salvarConfiguracoes() {
  console.log('Configurações salvas:', {
    notificacoesAtivadas: notificacoesAtivadas.value,
    notificarPorEmail: notificarPorEmail.value,
    notificarPorPush: notificarPorPush.value,
    frequenciaNotificacao: frequenciaNotificacao.value,
    ofertasPersonalizadas: ofertasPersonalizadas.value,
    idioma: idioma.value,
  });

  // Aqui você pode enviar pro backend ou salvar no localStorage, se quiser.
}
</script>

<style scoped>
.config-container {
  max-width: 700px;
  margin: 40px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.titulo {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
}

.config-section {
  margin-bottom: 40px;
}

.secao-titulo {
  font-size: 20px;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 20px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.label-switch {
  font-size: 16px;
  color: #333;
}

.switch {
  width: 20px;
  height: 20px;
  accent-color: #007bff;
  cursor: pointer;
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
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-salvar:hover {
  background-color: #0056b3;
}
</style>

