<template>
  <div class="wishlist-container">
    <h1 class="titulo-pagina">Minha Lista de Desejos</h1>

    <div v-if="itens.length > 0" class="lista-itens">
      <div 
        class="item-desejo" 
        v-for="item in itens" 
        :key="item.id"
        @click="irParaDetalhes(item.id)"
      >
        <img :src="item.imagem" alt="Foto do Produto" class="imagem-produto" />
        <div class="detalhes">
          <h2 class="nome-produto">{{ item.nome }}</h2>
          <p class="preco-atual">
  Preço atual: R$ 
  {{ typeof item.preco === 'number' ? item.preco.toFixed(2).replace('.', ',') : 'Indisponível' }}
</p>
        </div>
      </div>
    </div>

    <div v-else class="sem-itens">
      Sua lista de desejos está vazia. Adicione produtos para acompanhar preços!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = useCookie('token')
const itens = ref([])

async function carregarItens() {
  if (!token.value) {
    console.warn('Token não encontrado. Usuário não autenticado.')
    return
  }

  try {
    const response = await fetch('https://api.promohawk.com.br/api/user-favoritos', {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Erro na resposta da API:', response.status, await response.text())
      return
    }

    const data = await response.json()
    console.log('Dados da API:', data)

    if (!Array.isArray(data.favoritos)) {
      console.error('Favoritos não é um array:', data.favoritos)
      return
    }

    itens.value = data.favoritos.map(fav => ({
      id: fav.produto_id,
      nome: fav.produto_nome,
      imagem: fav.produto_imagem,
      preco: Number(fav.produto_preco) || 0
    }))

    console.log('Itens carregados no estado:', itens.value)
  } catch (error) {
    console.error('Erro ao carregar itens da lista de desejos:', error)
  }
}

function irParaDetalhes(id) {
  router.push(`/produto/${id}`)
}

onMounted(() => {
  carregarItens()
})
</script>

<style scoped>
.wishlist-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.titulo-pagina {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.lista-itens {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item-desejo {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
}

.item-desejo:hover {
  background-color: #eef3f8;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.15);
}

.imagem-produto {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.detalhes {
  flex: 1;
}

.nome-produto {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.preco-atual {
  font-size: 16px;
  color: #007bff;
  margin-bottom: 6px;
}

.sem-itens {
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-top: 40px;
}
</style>





