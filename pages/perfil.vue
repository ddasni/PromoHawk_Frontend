<template>
  <div class="perfil-container">
    <div class="foto-section">
      <div class="foto-perfil">
        <img :src="fotoPerfil" alt="" />
      </div>
      <button class="btn-editar-foto" @click="editarFoto">
        <img src="/assets/icons/lapis.svg" alt="Editar Foto" class="icone-editar" />
      </button>
      <input type="file" ref="inputFile" @change="alterarFoto" style="display: none" />
      <h2 class="nome-usuario">{{ nomeUsuario }}</h2>
    </div>

    <div class="info-perfil">
      <div class="info-item" v-for="(label, key) in campos" :key="key">
        <label :for="key">{{ label }}</label>
        <input v-model="dados[key]" :type="key === 'senha' ? 'password' : 'text'" :id="key" class="input" />
      </div>
      <div class="info-actions">
        <button @click="salvarAlteracoes" class="btn-salvar">Salvar Alterações</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fotoPerfil = ref('https://via.placeholder.com/150');
const nomeUsuario = ref('João Silva');

const dados = ref({
  username: 'joao_silva',
  nome: 'João Silva',
  telefone: '(11) 91234-5678',
  email: 'joao.silva@email.com',
  senha: 'senha123'
});

const campos = {
  username: 'Nome de usuário:',
  nome: 'Nome:',
  telefone: 'Telefone:',
  email: 'Email:',
  senha: 'Senha:'
};

function editarFoto() {
  const input = document.querySelector('input[type="file"]');
  input?.click();
}

function alterarFoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      fotoPerfil.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

function salvarAlteracoes() {
  console.log('Alterações salvas:', { nomeUsuario: nomeUsuario.value, ...dados.value });
}
</script>

<style scoped>
.perfil-container {
  max-width: 600px;
  margin: 40px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.foto-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.foto-perfil {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #e0e0e0;
  background-color: #f0f0f0;
}

.foto-perfil img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-editar-foto {
  margin-top: 12px;
  background: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-editar-foto:hover {
  background-color: #007bff;
  border-color: #007bff;
}

.icone-editar {
  width: 20px;
  height: 20px;
}

.nome-usuario {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-top: 16px;
}

.info-perfil {
  width: 100%;
}

.info-item {
  margin-bottom: 20px;
}

.info-item label {
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
  color: #555;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.info-actions {
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

