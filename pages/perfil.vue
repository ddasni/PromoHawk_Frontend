<template>
  <div class="perfil-container">
    <h1 class="titulo-pagina">Editar Perfil</h1>
    <p class="descricao-pagina">Mantenha suas informações pessoais atualizadas.</p>

    <div class="foto-section">
      <div class="foto-perfil" @click="editarFoto">
        <img :src="fotoPerfil" />
        <div class="overlay">
          <img :src="lapisIcon" alt="Editar" />
        </div>
      </div>
      <input type="file" ref="inputFile" @change="alterarFoto" style="display: none" />
      <h2 class="nome-usuario">{{ dados.nome || 'Usuário' }}</h2>
    </div>

    <div class="info-perfil">
      <div class="info-item" v-for="(label, key) in campos" :key="key">
        <label :for="key">{{ label }}</label>

        <div v-if="key.includes('senha')" class="senha-wrapper">
          <input
            v-model="dados[key]"
            :type="mostrarSenha ? 'text' : 'password'"
            :id="key"
            class="input"
            :placeholder="label"
          />
          <img
            :src="mostrarSenha ? eyeOffIcon : eyeIcon"
            class="icone-olho"
            @click="mostrarSenha = !mostrarSenha"
            alt="Ver senha"
          />
        </div>

        <input
          v-else
          v-model="dados[key]"
          :type="key === 'email' ? 'email' : 'text'"
          :id="key"
          class="input"
          :placeholder="label"
        />
      </div>

      <div class="info-actions">
        <button @click="salvarAlteracoes" class="btn-salvar">
          Salvar Alterações
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'

import lapisIcon from '@/assets/icons/lapis.svg'
import eyeIcon from '@/assets/icons/eye.svg'
import eyeOffIcon from '@/assets/icons/eye-off.svg'

const router = useRouter()

const tokenCookie = useCookie('token')
const userCookie = useCookie('user')

const mostrarSenha = ref(false)
const fotoPerfil = ref('https://via.placeholder.com/150')

const dados = ref({
  username: '',
  nome: '',
  telefone: '',
  email: '',
  senha: '',
  confirmarSenha: '',
})

const campos = {
  username: 'Nome de usuário:',
  nome: 'Nome completo:',
  telefone: 'Telefone:',
  email: 'Email:',
  senha: 'Senha:',
  confirmarSenha: 'Confirmar senha:',
}

function parseUserCookie() {
  try {
    if (typeof userCookie.value === 'string') {
      return JSON.parse(userCookie.value)
    } else if (typeof userCookie.value === 'object') {
      return userCookie.value
    }
    return {}
  } catch {
    return {}
  }
}

// Atualiza dados e foto do usuário no estado local
function carregarDadosUsuario(user) {
  dados.value = {
    username: user.username || '',
    nome: user.nome || '',
    telefone: user.telefone || '',
    email: user.email || '',
    senha: '',
    confirmarSenha: '',
  }
  if (user.foto) {
    fotoPerfil.value = `https://api.promohawk.com.br/storage/${user.foto}`
  } else {
    fotoPerfil.value = 'https://via.placeholder.com/150'
  }
}

onMounted(() => {
  const user = parseUserCookie()
  if (!user?.id || !tokenCookie.value) {
    router.push('/login')
    return
  }
  carregarDadosUsuario(user)
})

function editarFoto() {
  const input = document.querySelector('input[type="file"]')
  input?.click()
}

async function alterarFoto(event) {
  const file = event.target.files[0]
  if (!file) return

  const user = parseUserCookie()
  const token = tokenCookie.value

  if (!user?.id || !token) {
    alert('Você precisa estar logado.')
    router.push('/login')
    return
  }

  const formData = new FormData()
  formData.append('imagem', file)

  try {
    const res = await fetch(
      `https://api.promohawk.com.br/api/users/${user.id}/editImage`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )

    const responseData = await res.json()

    if (!res.ok) {
      throw new Error(responseData?.erros?.imagem?.[0] || 'Erro ao atualizar imagem')
    }

    // Atualiza apenas o campo foto do usuário no cookie
    user.foto = responseData.foto || user.foto

    // Regrava o cookie sem perder os dados
    userCookie.value = JSON.stringify(user)

    // Atualiza foto local para exibir na tela
    fotoPerfil.value = `https://api.promohawk.com.br/storage/${user.foto}`

    alert('Foto atualizada com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar imagem:', error)
    alert(`Erro ao enviar imagem: ${error.message}`)
  }
}


async function salvarAlteracoes() {
  if (dados.value.senha !== dados.value.confirmarSenha) {
    alert('As senhas não coincidem.')
    return
  }

  const user = parseUserCookie()
  const token = tokenCookie.value

  if (!user?.id || !token) {
    alert('Você precisa estar logado.')
    router.push('/login')
    return
  }

  // Verificar se algum dado foi alterado
  const dadosAtuais = {
    username: dados.value.username,
    nome: dados.value.nome,
    telefone: dados.value.telefone,
    email: dados.value.email,
  }

  const dadosOriginais = {
    username: user.username,
    nome: user.nome,
    telefone: user.telefone,
    email: user.email,
  }

  const alterouAlgo =
    Object.keys(dadosAtuais).some(
      (key) => dadosAtuais[key] !== dadosOriginais[key]
    ) || !!dados.value.senha

  if (!alterouAlgo) {
    alert('Nenhuma alteração detectada.')
    return
  }

  const payload = {
    ...dadosAtuais,
  }

  if (dados.value.senha) {
    payload.senha = dados.value.senha
  }

  try {
    const res = await fetch(
      `https://api.promohawk.com.br/api/users/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    )

    const responseData = await res.json()

    if (!res.ok) {
      console.error('Erro ao atualizar perfil:', responseData)
      throw new Error(responseData?.message || 'Erro ao atualizar perfil')
    }

    userCookie.value = JSON.stringify(responseData)
    carregarDadosUsuario(responseData)

    alert('Dados atualizados com sucesso!')
    dados.value.senha = ''
    dados.value.confirmarSenha = ''
  } catch (error) {
    console.error('Erro ao salvar alterações:', error)
    alert(`Erro ao salvar alterações: ${error.message}`)
  }
}



</script>




<style scoped>
/* Mantive seu estilo anterior */
.perfil-container {
  max-width: 600px;
  margin: 60px auto;
  background: #ffffff;
  padding: 48px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  text-align: center;
}

.titulo-pagina {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1e293b;
}

.descricao-pagina {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 40px;
}

.foto-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.foto-perfil {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #e2e8f0;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.foto-perfil:hover {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

.foto-perfil img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.3s;
}

.foto-perfil:hover .overlay {
  opacity: 1;
}

.overlay img {
  width: 20px;
  height: 20px;
  filter: invert(1);
}

.nome-usuario {
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #334155;
}

.info-perfil {
  text-align: left;
  margin-top: 20px;
}

.info-item {
  margin-bottom: 20px;
}

.info-item label {
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
  display: block;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  background-color: #f8fafc;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  background-color: white;
}

.senha-wrapper {
  position: relative;
}

.icone-olho {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.5;
}

.icone-olho:hover {
  opacity: 1;
}

.info-actions {
  margin-top: 30px;
  text-align: center;
}

.btn-salvar {
  background-color: #3b82f6;
  color: white;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-salvar:hover {
  background-color: #2563eb;
}
</style>

