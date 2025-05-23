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
      <div
        class="info-item"
        v-for="(label, key) in campos"
        :key="key"
      >
        <label :for="key">{{ label }}</label>

        <div v-if="key === 'senha'" class="senha-wrapper">
          <input
            v-model="dados.senha"
            :type="mostrarSenha ? 'text' : 'password'"
            id="senha"
            class="input"
            placeholder="Senha"
          />
          <img
            :src="mostrarSenha ? eyeOffIcon : eyeIcon"
            class="icone-olho"
            @click="mostrarSenha = !mostrarSenha"
            alt="Ver senha"
          />
        </div>

        <div v-else-if="key === 'confirmarSenha'" class="senha-wrapper">
          <input
            v-model="dados.confirmarSenha"
            :type="mostrarSenha ? 'text' : 'password'"
            id="confirmarSenha"
            class="input"
            placeholder="Confirmar Senha"
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
import lapisIcon from '@/assets/icons/lapis.svg'
import eyeIcon from '@/assets/icons/eye.svg'
import eyeOffIcon from '@/assets/icons/eye-off.svg'
import { useCookie } from '#app'

const router = useRouter()
const tokenCookie = useCookie('token')
const userCookie = useCookie('user')

const fotoPerfil = ref('https://via.placeholder.com/150')
const mostrarSenha = ref(false)

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

onMounted(async () => {
  const userId = userCookie.value?.id
  const token = tokenCookie.value

  if (!userId || !token) {
    router.push('/login')
    return
  }

  try {
    const res = await fetch(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Falha ao buscar dados do usuário.')

    const user = await res.json()

    dados.value = {
      username: user.username || '',
      nome: user.nome || '',
      telefone: user.telefone || '',
      email: user.email || '',
      senha: '',
      confirmarSenha: '',
    }

    if (user.foto) {
      fotoPerfil.value = user.foto
    }
  } catch (err) {
    console.error(err)
    alert('Erro ao carregar dados do perfil.')
  }
})

function editarFoto() {
  const input = document.querySelector('input[type="file"]')
  input?.click()
}

function alterarFoto(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      fotoPerfil.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

async function salvarAlteracoes() {
  if (dados.value.senha !== dados.value.confirmarSenha) {
    alert('As senhas não coincidem.')
    return
  }

  const userId = userCookie.value?.id
  const token = tokenCookie.value

  if (!userId || !token) {
    alert('Você precisa estar logado para salvar.')
    router.push('/login')
    return
  }

  try {
    // Prepara payload removendo confirmarSenha e senha vazia
    const payload = { ...dados.value, foto: fotoPerfil.value }
    delete payload.confirmarSenha

    if (!payload.senha) {
      delete payload.senha
    }

    const res = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('Erro ao atualizar perfil.')
    }

    // Atualize cookie user se quiser, com dados novos
    const updatedUser = await res.json()
    userCookie.value = JSON.stringify(updatedUser)

    alert('Perfil atualizado com sucesso!')
    dados.value.senha = ''
    dados.value.confirmarSenha = ''
  } catch (err) {
    console.error('Erro ao salvar:', err)
    alert('Erro ao salvar alterações.')
  }
}
</script>


<style scoped>
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
  opacity: 0.7;
}

.icone-olho:hover {
  opacity: 1;
}

.info-actions {
  text-align: center;
  margin-top: 30px;
}

.btn-salvar {
  padding: 14px 36px;
  background-color: #3b82f6;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-salvar:hover {
  background-color: #2563eb;
}
</style>
