<template>
  <UDropdownMenu size="xl" arrow :items="items" :ui="{ content: 'w-48' }">

    <!-- esse é o icone onde deve clicar para exibir o dropdown menu-->
    <UButton
      class="font-bold rounded-full"
      icon="icon:user"
      size="xl"
      color="primary"
      variant="solid"
    />

    <template #button>
      <!-- Esse é um slot -->
      <div class="flex gap-3">
        <NuxtLink to="/Login" class="link">
          <Botao nome="Login" size="sm" cor="tertiary" />
        </NuxtLink>
        <NuxtLink to="/Cadastro" class="link">
          <Botao nome="Cadastro" size="sm" cor="tertiary" />
        </NuxtLink>
      </div>
    </template>
  </UDropdownMenu>
</template>

<script lang="ts" setup>
import Botao from "~/components/Common/botao.vue";

//=====================================================

// pegando o dropdown menu da biblioteca NuxtUI
import type { DropdownMenuItem } from "@nuxt/ui";

// configuração/design desse dropdown menu
const items = ref<DropdownMenuItem[]>([
  [
    {
      label: "Zezinho",
      avatar: {
        src: "https://github.com/benjamincanac.png",
      },
      type: "label",
    },
  ],
  [
    {
      label: "Perfil",
      icon: "i-lucide-user",
      to: 'perfil'
    },
    {
      label: "Lista de Desejos",
      icon: "heroicons-outline:heart",
      to:'listadesejo'
    },
    {
      label: "Notificações",
      icon: "heroicons:bell",
    },
    {
      label: "Configurações",
      icon: "i-lucide-cog",
      to:'config'
    },
  ],
  [
    {
      slot: "button",
      type: "label",
    },
  ],
]);
</script>

<style scoped>

</style>