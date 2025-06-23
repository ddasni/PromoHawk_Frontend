<template>
  <div class="wishlist-container">
    <div class="wishlist-header">
      <h1 class="titulo-pagina">Minha Lista de Desejos</h1>
      <p class="subtitulo" v-if="itens.length > 0">{{ itens.length }} iten{{ itens.length !== 1 ? 's' : '' }} na lista</p>
    </div>

    <div v-if="itens.length > 0" class="lista-itens">
      <div 
        class="item-desejo" 
        v-for="item in itens" 
        :key="item.id"
        @click="irParaDetalhes(item.id)"
      >
        <div class="imagem-container">
          <img 
            :src="item.imagem" 
            alt="Foto do Produto" 
            class="imagem-produto" 
          />
        </div>
        <div class="detalhes">
          <h2 class="nome-produto">{{ item.nome }}</h2>
          <div class="preco-container">
            <span class="preco-atual">R$ {{ item.preco || 'Indisponível' }}</span>
            <span class="loja-badge" v-if="item.loja">{{ item.loja }}</span>
          </div>
          <button class="botao-detalhes" @click.stop="irParaDetalhes(item.id)">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>

    <div v-else class="sem-itens">
      <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="Lista vazia" class="empty-icon" />
      <h3>Sua lista de desejos está vazia</h3>
      <p>Adicione produtos para acompanhar os melhores preços!</p>
      <button class="botao-explorar" @click="irParaExplorar">Explorar produtos</button>
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
      id: fav.produto.id,
      nome: fav.produto.nome,
      imagem: fav.produto.imagens?.[0] || 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png',
      preco: fav.produto.precos?.[0]?.preco || 'Indisponível',
      loja: fav.produto.precos?.[0]?.loja?.nome
    }))

    console.log('Itens carregados no estado:', itens.value)
  } catch (error) {
    console.error('Erro ao carregar itens da lista de desejos:', error)
  }
}

function irParaDetalhes(id) {
  router.push(`/produto/${id}`)
}

function irParaExplorar() {
  router.push('/produtos')
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.wishlist-header {
  text-align: center;
  margin-bottom: 30px;
}

.titulo-pagina {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2d3748;
  background: linear-gradient(90deg, #4a5568, #1a202c);

  /* Compatibilidade com background-clip: text */
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;

  /* Necessário para mostrar texto com gradiente */
  color: transparent;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;

  letter-spacing: -0.5px;
}

.subtitulo {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.lista-itens {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.item-desejo {
  display: flex;
  gap: 16px;
  background-color: #ffffff;
  border: 1px solid #edf2f7;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.item-desejo:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03);
  border-color: #e2e8f0;
  background: #f8fafc;
}

.imagem-container {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.imagem-produto {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.detalhes {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nome-produto {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;

  /* Suporte para clamping (limitar número de linhas) */
  display: -webkit-box;         /* Necessário para aplicar line-clamp */
  display: -moz-box;            /* Para compatibilidade extra com Firefox antigo */
  display: box;

  -webkit-box-orient: vertical; /* Define a direção do box */
  -moz-box-orient: vertical;
  box-orient: vertical;

  -webkit-line-clamp: 2;        /* Limita a 2 linhas */
  overflow: hidden;             /* Oculta o excesso */
  text-overflow: ellipsis;      /* Adiciona reticências (...) */
  line-clamp: 2;                /* Não é amplamente suportado, mas pode ser incluído */
  line-height: 1.4;
}

.preco-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.preco-atual {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
}

.loja-badge {
  font-size: 12px;
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.botao-detalhes {
  align-self: flex-start;
  background: #edf2f7;
  color: #4a5568;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.botao-detalhes:hover {
  background: #e2e8f0;
  color: #2d3748;
}

.sem-itens {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  opacity: 0.4;
  margin-bottom: 20px;
  filter: grayscale(100%);
}

.sem-itens h3 {
  font-size: 20px;
  color: #2d3748;
  margin-bottom: 8px;
  font-weight: 600;
}

.sem-itens p {
  font-size: 15px;
  color: #718096;
  margin-bottom: 20px;
}

.botao-explorar {
  background: #2d3748;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.3px;
}

.botao-explorar:hover {
  background: #1a202c;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .wishlist-container {
    padding: 20px;
    margin: 20px;
  }
  
  .lista-itens {
    grid-template-columns: 1fr;
  }
  
  .item-desejo {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .imagem-container {
    width: 100%;
    height: 180px;
  }
  
  .titulo-pagina {
    font-size: 28px;
  }
}
</style>