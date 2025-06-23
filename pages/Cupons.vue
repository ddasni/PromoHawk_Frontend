<script setup>
import Cupom from "~/components/Common/Cards/Card_cupom.vue"

const { data: cuponsData, error: errorCupons } = await useFetch('https://api.promohawk.com.br/api/cupom')

const cupons = computed(() => cuponsData.value?.cupons || [])
</script>

<template>
  <section class="cupons-container">
    <h1> Cupons de Desconto</h1>
    <p class="subtitulo">Pegue um cupom e economize agora nas suas compras online!</p>

    <div class="cupons-list">
      <Cupom
        v-for="cupom in cupons"
        :key="cupom.id"
        :codigo="cupom.codigo"
        :desconto="cupom.desconto"
        :validade="cupom.validade"
        :descricao="cupom.descricao"
      />
    </div>
  </section>
</template>

<style scoped>
.cupons-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #333;
}

.subtitulo {
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
}

.cupons-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  column-gap: 10px;  /* Espaço entre colunas (horizontal) */
  row-gap: 40px;     /* Espaço entre linhas (vertical) - Ajuste este valor */
}

.cupom-card {
  background: linear-gradient(135deg, #ffffff, #f7faff);
  border: 1px solid #e0e7ff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.cupom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.cupom-info h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.loja {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 10px;
}

.descricao {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.cupom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eef2ff;
  padding: 12px 16px;
  border-radius: 8px;
}

.codigo {
  font-weight: bold;
  font-size: 16px;
  color: #1e3a8a;
  letter-spacing: 1px;
}

button {
  background: #2563eb;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
}

button:hover {
  background: #1d4ed8;
}
</style>
