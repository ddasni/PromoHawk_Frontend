<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: 'Cupons de Desconto'
})

const cupons = [
  {
    id: 1,
    titulo: "10% OFF em toda a loja",
    loja: "Amazon",
    descricao: "Válido para todos os produtos vendidos e entregues pela Amazon.",
    codigo: "AMAZON10",
    validade: "30/06/2025"
  },
  {
    id: 2,
    titulo: "R$20 de desconto",
    loja: "Americanas",
    descricao: "Desconto em compras acima de R$100.",
    codigo: "AME20OFF",
    validade: "15/07/2025"
  },
  {
    id: 3,
    titulo: "Frete Grátis",
    loja: "Submarino",
    descricao: "Frete grátis em produtos selecionados.",
    codigo: "FRETEGRATIS",
    validade: "31/12/2025"
  }
]

function copiar(codigo: string) {
  navigator.clipboard.writeText(codigo)
  alert(`Código "${codigo}" copiado com sucesso!`)
}
</script>

<template>
  <section class="cupons-container">
    <div class="cupons-list">
      <div v-for="cupom in cupons" :key="cupom.id" class="cupom-card">
        <div class="cupom-info">
          <h2>{{ cupom.titulo }}</h2>
          <span class="loja">Loja: <strong>{{ cupom.loja }}</strong></span>
          <p class="descricao">{{ cupom.descricao }}</p>
          <p class="validade">Validade: <strong>{{ cupom.validade }}</strong></p>
        </div>
        <div class="cupom-footer">
          <span class="codigo">{{ cupom.codigo }}</span>
          <button @click="copiar(cupom.codigo)">Copiar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cupons-container {
  max-width: none;
  padding: 40px 20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.subtitulo {
  color: #666;
  margin-bottom: 40px;
  font-size: 16px;
}

.cupons-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;
}

.cupom-card {
  width: 320px;
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
  margin-bottom: 10px;
}

.validade {
  font-size: 14px;
  color: #ff0000;
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

