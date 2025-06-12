<template>
  <div v-if="produto" class="pagina-produto">
    <div class="topo">
      <ImagemCarousel :images="produto.imagens" />

      <div class="info">
        <h1 class="nome-produto">{{ produto.nome }}</h1>
        <p class="avaliacao">⭐ {{ avaliacao.toFixed(1) }} ({{ totalAvaliacoes }} avaliações)</p>
        <p class="menor-preco">menor preço via {{ produto.loja.nome }}</p>
        <p class="preco-vista">R$ {{ precoAtual }} à vista</p>
        <p class="parcelamento">{{ parcelas }}x de R$ {{ formatarNumero(precoAtual / parcelas) }} sem juros</p>
        <button class="botao-ver-opcoes">Ver opções de compra</button>
        <BotaoFavoritar :produtoId="produto.id" />
      </div>
    </div>

    <Grafico :produtoId="produto.id" />

    <div class="avaliacoes">
      <h3>Avaliação dos usuários</h3>
      <div class="nota-media">
        <strong>{{ avaliacao.toFixed(1) }}</strong>
        <span>({{ totalAvaliacoes }} reviews)</span>
      </div>

      <div class="barras">
        <div v-for="estrela in 5" :key="estrela" class="barra-avaliacao">
          <span>{{ estrela }} estrela</span>
          <div class="barra">
            <div class="preenchida" :style="{ width: getBarraWidth(estrela) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulário de Review -->
    <div v-if="isLoggedIn" class="form-review">
      <h3>Deixe sua avaliação</h3>
      <label>Nota (1 a 5):</label>
      <select v-model="novaAvaliacao">
        <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
      </select>

      <label>Comentário:</label>
      <textarea v-model="novoComentario" placeholder="Escreva sua opinião..."></textarea>

      <button @click="enviarReview">Enviar avaliação</button>
    </div>
    <div v-else class="aviso-login">
      Faça login para deixar uma avaliação.
    </div>

    <!-- Comentários -->
    <div class="comentarios">
      <h3>Comentários</h3>
      <div v-for="comentario in comentarios" :key="comentario.id" class="comentario">
        <p><strong>⭐ {{ comentario.avaliacao_produto }}</strong> — {{ comentario.comentario_produto }}</p>
      </div>
    </div>
  </div>

  <div v-else class="carregando">
    Carregando produto...
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useFetch, useCookie, useRuntimeConfig } from '#imports'
import ImagemCarousel from '~/components/Produto/Imagem.vue'
import Grafico from '~/components/Produto/Grafico.vue'
import BotaoFavoritar from '~/components/Produto/botaofavoritar.vue'

const route = useRoute()
const { id } = route.params
const config = useRuntimeConfig()

const produto = ref(null)
const avaliacao = ref(0)
const totalAvaliacoes = ref(0)
const parcelas = ref(10)
const comentarios = ref([])
const novaAvaliacao = ref(5)
const novoComentario = ref('')
const precoAtual = computed(() => produto.value?.precos?.[0]?.preco || 0)

const token = useCookie('token')
const user = useCookie('user')
const isLoggedIn = computed(() => !!token.value && !!user.value)

onMounted(async () => {
  await buscarProduto()
  await buscarReviews()
})

function formatarNumero(valor) {
  return valor.toFixed(2).replace('.', ',')
}

function getBarraWidth(estrela) {
  if (!Array.isArray(comentarios.value)) return 0
  const count = comentarios.value.filter(c => c.avaliacao_produto === estrela).length
  return totalAvaliacoes.value ? (count / totalAvaliacoes.value) * 100 : 0
}


async function buscarProduto() {
  const { data, error } = await useFetch(`https://api.promohawk.com.br/api/produto/${id}`, {
    onResponse({ response }) {
      produto.value = response._data.produto
      if (produto.value.precos?.length > 0) {
        produto.value.precos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }
    },
    onError(error) {
      console.error('Erro ao buscar produto:', error)
    }
  })
}

async function buscarReviews() {
  try {
    const { data, error } = await useFetch(`https://api.promohawk.com.br/api/review/${id}`)

    if (error.value || !data.value) {
      throw new Error(`Erro ao buscar avaliações: ${error.value?.message || 'Erro desconhecido'}`)
    }

    comentarios.value = Array.isArray(data.value) ? data.value : []
    totalAvaliacoes.value = comentarios.value.length

    if (totalAvaliacoes.value > 0) {
      const soma = comentarios.value.reduce((acc, c) => acc + c.avaliacao_produto, 0)
      avaliacao.value = soma / totalAvaliacoes.value
    } else {
      avaliacao.value = 0
    }

  } catch (err) {
    console.error('Erro ao buscar avaliações:', err)
    comentarios.value = []
    totalAvaliacoes.value = 0
    avaliacao.value = 0
  }
}





async function enviarReview() {
  if (!isLoggedIn.value) {
    alert('Você precisa estar logado para avaliar.')
    return
  }

  try {
    const response = await fetch('https://api.promohawk.com.br/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: JSON.stringify({
        produto_id: Number(id),
        usuario_id: user.value.id,
        avaliacao_produto: novaAvaliacao.value,
        comentario_produto: novoComentario.value
      })
    })

    if (!response.ok) throw new Error('Erro ao enviar review')

    novaAvaliacao.value = 5
    novoComentario.value = ''
    await buscarReviews()
    alert('Avaliação enviada com sucesso!')
  } catch (err) {
    console.error(err)
    alert('Erro ao enviar sua avaliação.')
  }
}
</script>


<style scoped>
.pagina-produto {
  padding: 40px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
}

.topo {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 40px;
}

.imagens-laterais {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.miniatura {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.imagem-produto-principal {
  width: 300px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  background-color: #f3f4f6;
}

.nome-produto{
  color: black;
  font-size: 1.6rem;
}

.info {
  flex: 1;
}

.avaliacao {
  font-size: 1.1rem;
  color: #f59e0b;
}

.menor-preco {
  color: #10b981;
  font-size: 0.9rem;
}

.preco-vista {
  font-size: 1.5rem;
  color: #10b981;
  font-weight: bold;
}

.parcelamento {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.botao-ver-opcoes {
  background-color: #10b981;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
}

.botao-favorito {
  background: transparent;
  border: 2px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  font-size: 1.4rem;
  
}

.grafico-preco {
  margin-top: 40px;
}

.cabecalho-grafico {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.periodo button {
  margin-left: 8px;
  background-color: #e5e7eb;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.preco-loja {
  margin-top: 40px;
}

.card-loja {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.card-loja img {
  height: 40px;
}

.botao-ir-loja {
  margin-left: auto;
  background-color: #0f766e;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.avaliacoes {
  margin-top: 40px;
}

.nota-media {
  font-size: 2rem;
  font-weight: bold;
}

.barras {
  margin-top: 10px;
}

.barra-avaliacao {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.barra {
  flex: 1;
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.preenchida {
  background: #f59e0b;
  height: 100%;
}

.comentarios {
  margin-top: 40px;
}

.comentario {
  background: #f3f4f6;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: zoom-out;
}

.imagem-modal {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
}

.miniaturas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.miniatura {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s;
}

.miniatura:hover {
  border-color: #3b82f6;
}

.form-review {
  margin-top: 40px;
  background: #f9fafb;
  padding: 20px;
  border-radius: 10px;
}

.form-review textarea {
  width: 100%;
  min-height: 80px;
  margin-bottom: 10px;
}

.form-review select {
  margin-bottom: 10px;
}

.aviso-login {
  margin-top: 20px;
  color: #6b7280;
  font-style: italic;
}
</style>