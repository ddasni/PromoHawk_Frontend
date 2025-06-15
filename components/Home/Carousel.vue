<template>
  <UCarousel
    v-slot="{ item }"
    dots
    :items="items"
    :autoplay="{ delay: 7000 }"
    class="w-full max-w-6xl mx-auto"
  >
    <img
      :src="item"
      class="w-full h-auto rounded-lg object-cover"
      alt="Banner"
    />
  </UCarousel>
</template>

<script setup lang="ts">
const items = [
  'https://i.promobit.com.br/553472202417480437729638015872_banner.png',
  'https://i.promobit.com.br/897635684117480439554055940494_banner.png',
  'https://i.promobit.com.br/538018535717480439033055342777_banner.png'
]
</script>