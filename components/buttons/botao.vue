<template>
    <button 
        :type="type"
        :class="[baseClass, sizeClass, colorClass]"
        @click="handleClick"
    >
        {{ nome }}
    </button>
</template>
  
<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    nome?: string
    size?: 'sm' | 'md' | 'lg'
    cor?: 'primary' | 'dois' | 'tres'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    nome: 'Button',
    size: 'md',
    cor: 'primary',
    type: 'button',
  }
)

// Emitir evento de clique
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { nome, size, cor, type } = toRefs(props)

// Classe base com estilos gerais
const baseClass = 'rounded-md font-semibold transition duration-200 hover:opacity-90 shadow-md'

// Tamanhos
const sizeClass = computed(() => {
  switch (size.value) {
    case 'sm':
      return 'px-4 py-2 text-sm'
    case 'lg':
      return 'px-8 py-4 text-lg'
    case 'md':
    default:
      return 'px-6 py-3 text-base'
  }
})

// Cores
const colorClass = computed(() => {
  switch (cor.value) {
    case 'dois':
      return 'bg-red-500 text-white'
    case 'tres':
      return 'bg-green-500 text-white'
    case 'primary':
    default:
      return 'bg-blue-500 text-white'
  }
})

// Clique
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script> 