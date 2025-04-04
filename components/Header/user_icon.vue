<template>
  <UDropdownMenu arrow :items="items" :ui="{ content: 'w-60' }">

  <!-- esse é o icone onde deve clicar para exibir o dropdown menu-->
  <UButton icon="heroicons:user-circle-solid" size="xl" color="neutral" variant="ghost" />
  <!--
  label -> texto que vai ser exibido

  icon -> icone que vai ser exibido. o nuxt usa a bibliota de icones do iconify
  -->


  <template #button> <!-- Esse é um slot -->
    <div class="flex items-center gap-3 p-2">
      <NuxtLink to="/Login" class="Botao">Login</NuxtLink>
      <NuxtLink to="/Cadastro" class="Botao">Cadastro</NuxtLink>
    </div>
  </template>

  </UDropdownMenu>
</template>

<script lang="ts" setup>
import Botao from '~/components/buttons/botao.vue'

//=====================================================

// pegando o dropdown menu da biblioteca NuxtUI
import type { DropdownMenuItem } from '@nuxt/ui'

// configuração/design desse dropdown menu
const items = ref<DropdownMenuItem[]>([
  [
    {
      label: 'Zezinho', 
      avatar: {
        src: 'https://github.com/benjamincanac.png'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Perfil',
      icon: 'i-lucide-user'
    },
    {
      label: 'Lista de Desejos',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog'
    }
  ],
  [
    {
      slot: 'button',
      type: 'label'
    }
  ]
])
</script>

<style scoped>
.Botao {
  width: 6rem;
  padding: 0.5rem 1.5rem;
  background-color: #3490dc;
  color: #fff;
  border-radius: 0.5rem;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.2s, transform 0.1s;

  /* Ajuste de texto */
  font-size: clamp(0.75rem, 1vw, 1rem); /* Diminui conforme o espaço */
  white-space: nowrap; /* Impede quebra de linha */
  word-wrap: break-word; /* Quebra a palavra se necessário */
  text-align: center;    /* Centraliza o texto */
}

.Botao:hover {
  background-color: #2779bd;
  transform: scale(1.05);
}

.Botao:active {
  background-color: #1d5a8b;
  transform: scale(0.95);
}

</style>