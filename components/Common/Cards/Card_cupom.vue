<template>
  <section class="px-4 flex justify-center">
    <div class="card" :class="{ 'expanded': showCode }">
      <div class="card-content">
        <!-- Data de validade -->
        <div class="validity-date">
          <span class="text-white text-sm font-medium">{{ validadeFormatada }}</span>
        </div>

        <!-- Desconto, descrição e o botão para exibir o codigo -->
        <div class="main-content">
          <div class="text-center">
            <span class="text-2xl font-bold text-white">{{ descontoTexto }}</span>
            <br />
            <span class="text-gray-200 text-sm">
              {{ descricao || 'Cupom exclusivo da loja!' }}
            </span>
          </div>
          <button
            @click="toggleCode"
            class="text-gray-900 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg w-fit mx-auto transition-colors duration-200 flex gap-1 items-center group"
          >
            <span>{{ showCode ? 'Esconder código' : 'Ver código' }}</span>
            <svg
              viewBox="0 0 256 256"
              height="1em"
              width="1em"
              class="group-hover:translate-x-1 transition-transform duration-200"
              fill="currentColor"
            >
              <path
                d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Área do código -->
        <div class="coupon-code" v-if="showCode">
          <div class="code-container">
            <span class="code-text">{{ codigo }}</span>
            <button @click="copyCode" class="copy-button">
              Copiar
            </button>
          </div>
          <p v-if="copied" class="copy-message">Código copiado!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// extração das props
const { codigo, desconto, validade, descricao } = defineProps({
  codigo: String,
  desconto: String,
  validade: String,
  descricao: String
});

const showCode = ref(false);
const copied = ref(false);

// Copiar o codigo
const toggleCode = () => {
  showCode.value = !showCode.value;
  if (copied.value) copied.value = false;
};

const copyCode = () => {
  navigator.clipboard.writeText(codigo);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

// Formatação da data
const validadeFormatada = computed(() => {
  if (!validade) return '';
  const data = new Date(validade);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(data);
});

// Transformar (exemplo) 40.00 → "40% de desconto"
const descontoTexto = computed(() => {
  const d = parseFloat(desconto || 0);
  return `${d}% de desconto`;
});
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 350px;
  min-height: 200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  border-radius: 20px;
  justify-content: center;
  position: relative;
  transition: all 0.4s ease;
  overflow: hidden;
  background-image: url('https://images.unsplash.com/photo-1671159593357-ee577a598f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}

@media (max-width: 480px) {
  .card {
    border-radius: 14px;
  }

  .card-content {
    padding-top: 16px;
  }

  .main-content {
    padding: 16px;
    gap: 12px;
  }

  .coupon-code {
    padding: 0 16px 16px;
  }

  .validity-date {
    top: 16px;
    right: 16px;
    font-size: 0.75rem;
    padding: 3px 10px;
  }

  .copy-button {
    padding: 4px 10px;
    font-size: 0.8rem;
  }

  .code-text {
    font-size: 1rem;
  }
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}

.card.expanded {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  min-height: 250px; /* Altura maior quando expandido */
}

.card-content {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding-top: 20px; /* Adicionei padding no topo */
}

/* Estilo para a data de validade */
.validity-date {
  position: absolute;
  top: 20px; /* Ajuste para ficar abaixo do padding */
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  z-index: 2; /* Garante que fique acima de outros elementos */
}

/* Conteúdo principal */
.main-content {
  padding: 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px; /* Ajuste no espaçamento */
}

.card.expanded .main-content {
  padding-bottom: 10px; /* Reduz padding inferior quando expandido */
}

.coupon-code {
  padding: 0 20px 20px; /* Aumentei o padding inferior */
  text-align: center;
  animation: fadeIn 0.3s ease;
  margin-top: auto;
}

.code-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  gap: 30px;
  border-radius: 10px;
  padding: 10px 15px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-text {
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: bold;
  color: #4caf50;
  letter-spacing: 1px;
  text-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.copy-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
}

.copy-button:hover {
  background-color: #d32f2f;
  transform: translateY(-1px);
}

.copy-message {
  color: #4caf50;
  font-size: 0.9rem;
  margin-top: 8px;
  font-weight: bold;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>