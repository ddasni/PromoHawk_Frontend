<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 my-12">
    <!-- Título -->
    <h2 class="text-neutral-700 dark:text-neutral-500 text-lg font-semibold text-center sm:text-left">
      {{ title }}
    </h2>

    <!-- Linha -->
    <div class="hidden sm:flex flex-grow mx-4 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 opacity-30 dark:via-neutral-500"></div>

    <!-- Botão "Ver mais" -->
    <NuxtLink
      v-if="link"
      :to="link"
      class="relative inline-block text-sm font-medium text-neutral-400 hover:text-neutral-800 transition-colors before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-neutral-600 before:transition-all hover:before:w-full"
    >
      Ver mais
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  link: String
})
</script>