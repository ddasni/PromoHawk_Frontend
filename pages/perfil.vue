<template>
  <div class="perfil-container">
    <h1 class="titulo-pagina">Editar Perfil</h1>
    <p class="descricao-pagina">Mantenha suas informações pessoais atualizadas.</p>

    <div class="foto-section">
      <div class="foto-perfil" @click="editarFoto">
        <img :src="fotoPerfil" alt="Foto do perfil" />
        <div class="overlay">
          <img :src="lapisIcon" alt="Editar" />
        </div>
      </div>
      <input 
        type="file" 
        ref="inputFile" 
        @change="alterarFoto" 
        accept="image/*" 
        style="display: none" 
      />
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

const router = useRouter()
const token = useCookie('token')
const user = useCookie('user')

const mostrarSenha = ref(false)
const fotoPerfil = ref('https://via.placeholder.com/150')
const inputFile = ref(null)

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

// Ícones
const lapisIcon = '/icons/lapis.svg'
const eyeIcon = '/icons/eye.svg'
const eyeOffIcon = '/icons/eye-off.svg'

// Função utilitária para montar a URL da imagem corretamente
function getImagemUrl(caminho) {
  return caminho ? `https://api.promohawk.com.br/${caminho}` : 'https://via.placeholder.com/150'
}

function parseUserCookie() {
  try {
    if (user.value) {
      return typeof user.value === 'string' ? JSON.parse(user.value) : user.value
    }
    return {}
  } catch {
    return {}
  }
}

function carregarDadosUsuario(userData) {
  dados.value = {
    username: userData.username || '',
    nome: userData.nome || '',
    telefone: userData.telefone || '',
    email: userData.email || '',
    senha: '',
    confirmarSenha: '',
  }

  fotoPerfil.value = getImagemUrl(userData.foto || userData.imagem)
}

onMounted(() => {
  const userData = parseUserCookie()

  if (!userData?.id || !token.value) {
    router.push('/login')
    return
  }

  carregarDadosUsuario(userData)
})

function editarFoto() {
  inputFile.value.click()
}

async function alterarFoto(event) {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.match('image.*')) {
    alert('Por favor, selecione um arquivo de imagem válido.')
    return
  }

  const userData = parseUserCookie()

  if (!userData?.id || !token.value) {
    alert('Você precisa estar logado.')
    router.push('/login')
    return
  }

  const formData = new FormData()
  formData.append('imagem', file)

  try {
    const response = await fetch(
      `https://api.promohawk.com.br/api/users/${userData.id}/imagem`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
        body: formData,
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao atualizar imagem')
    }

    if (data.foto) {
      // Atualiza a imagem do perfil com nova URL
      fotoPerfil.value = getImagemUrl(data.foto)

      // Atualiza o cookie do usuário com nova imagem
      const updatedUser = { ...userData, foto: data.foto }
      user.value = JSON.stringify(updatedUser)
    }

    alert('Foto atualizada com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar imagem:', error)
    alert(`Erro ao enviar imagem: ${error.message}`)
  } finally {
    event.target.value = ''
  }
}

async function salvarAlteracoes() {
  if (dados.value.senha && dados.value.senha !== dados.value.confirmarSenha) {
    alert('As senhas não coincidem.')
    return
  }

  const userData = parseUserCookie()

  if (!userData?.id || !token.value) {
    alert('Você precisa estar logado.')
    router.push('/login')
    return
  }

  const alteracoes = {}
  const camposParaVerificar = ['username', 'nome', 'telefone', 'email']

  camposParaVerificar.forEach(campo => {
    if (dados.value[campo] !== userData[campo]) {
      alteracoes[campo] = dados.value[campo]
    }
  })

  if (dados.value.senha) {
    alteracoes.senha = dados.value.senha
  }

  if (Object.keys(alteracoes).length === 0) {
    alert('Nenhuma alteração detectada.')
    return
  }

  try {
    const response = await fetch(
      `https://api.promohawk.com.br/api/users/${userData.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
        body: JSON.stringify(alteracoes),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao atualizar perfil')
    }

    const updatedUser = { ...userData, ...alteracoes }
    user.value = JSON.stringify(updatedUser)
    carregarDadosUsuario(updatedUser)

    alert('Dados atualizados com sucesso!')
  } catch (error) {
    console.error('Erro ao salvar alterações:', error)
    alert(`Erro ao salvar alterações: ${error.message}`)
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