<script setup lang="ts">
import { computed, toRefs } from 'vue'

// Definindo as propriedades (props)
const props = withDefaults(
  defineProps<{
    nome?: string
    size?: 'sm' | 'md' | 'lg'
    cor?: 'primary' | 'secondary' | 'tertiary'
    imgSrc: string // Nova propriedade para a URL da imagem
  }>(),
  {
    nome: 'Insira um texto', // Texto padrão
    size: 'md', // Tamanho padrão
    cor: 'primary', // Cor padrão
  }
)

// Fazendo as propriedades disponíveis para o template
const { nome, size, cor, imgSrc } = toRefs(props)
</script>

<template>
  <div :class="['card-categoria-15', `size-${size}`, `cor-${cor}`]">
    <!-- Imagem agora usa a prop imgSrc -->
    <img class="imagem" alt="" :src="imgSrc" />
    <p class="txt">{{ nome }}</p>
  </div>
</template>

<style scoped>
.card-categoria-15 {
  position: relative;
  width: 170px;
  height: 200px;
  overflow: hidden;
  text-align: left;
  font-size: 24px;
  color: #000;
  background-color: rgba(255, 255, 255, 0);
  font-family: 'Open Sans';
}

.imagem {
  position: absolute;
  height: 76.74%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 23.26%;
  left: 0%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0), 6px 62px 17px rgba(0, 0, 0, 0.01), 4px 40px 16px rgba(0, 0, 0, 0.03), 2px 22px 13px rgba(0, 0, 0, 0.04), 1px 10px 10px rgba(0, 0, 0, 0.05), 0px 0px 0px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  background-color: #d9d9d9;
  border: 1px solid #006dbc;
  box-sizing: border-box;
}

.txt {
  position: absolute;
  height: 12.79%;
  width: 62.88%;
  top: 88.37%;
  left: 18.18%;
  display: flex;
  align-items: center;
}

/* Estilos para diferentes tamanhos */
.size-sm {
  width: 120px;
  height: 150px;
  font-size: 16px;
}

.size-md {
  width: 170px;
  height: 200px;
  font-size: 24px;
}

.size-lg {
  width: 220px;
  height: 250px;
  font-size: 32px;
}

/* Estilos para diferentes cores */
.cor-primary {
  border-color: #006dbc;
}

.cor-secondary {
  border-color: #ff6600;
}

.cor-tertiary {
  border-color: #33cc33;
}
</style>