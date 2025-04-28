<template>
    <button 
        :type="type"
        :class="[baseClass, sizeClass, colorClass, icone ? 'pl-10' : 'pl-6', sizeClass]"
        @click="handleClick"
    >
        <Icon v-if="icone" :name="icone" :class="iconSizeClass"/>
        {{ nome }}
    </button>
</template>
  
<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    icone?: string
    nome?: string
    size?: 'sm' | 'md' | 'lg' | 'icon'
    cor?: 'primary' | 'secondary' | 'tertiary'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    // Definições padrão do botao
    // nome: 'Button', // nome padrão
    size: 'md', // Tamanho padrão
    cor: 'primary', // cor padrão
    type: 'button', // tipo padrão
  }
)

const { icone, nome, size, cor, type } = toRefs(props)

// Classe base com estilos gerais do botao
const baseClass = 'rounded-md font-semibold transition duration-200 hover:opacity-90 shadow-md'

// classe das Cores do botao
const colorClass = computed(() => {
  switch (cor.value) {
    case 'tertiary':
      return 'bg-(--ui-tertiary) text-white'
    case 'secondary':
      return 'bg-(--ui-secondary) text-green'
    case 'primary':
      default:
        return 'bg-(--ui-primary) text-dark'
  }
})

// classe dos Tamanhos do botao
const sizeClass = computed(() => {
  switch (size.value) {
    case 'sm':
      return 'px-4 py-2 text-sm'
    case 'lg':
      return 'px-8 py-4 text-lg'
    case 'md':
      return 'px-6 py-3 text-md'
    case 'icon':
      default:
        return 'px-1 py-2 text-icon'
  }
})

// Classe do tamanho do icone
const iconSizeClass = computed(() => {
  switch (size.value) {
    case 'md':
      return 'w-6 h-6'; // ícone médio
    case 'lg':
      return 'w-8 h-8'; // ícone grande
    default:
      return 'w-4 h-4'; // ícone pequeno 
  }
})

// A codigo a baixo faz o seguinte:
// botão personalizado que se comporta como um <button @click="...">

// Evento de clique
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Clique
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script> 