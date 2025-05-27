<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  images: string[]
}

const props = withDefaults(defineProps<Props>(), {
  images: () => []
})

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)
const mostrarModal = ref(false)

function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}

function abrirModal(index: number) {
  activeIndex.value = index
  mostrarModal.value = true
}

function fecharModal() {
  mostrarModal.value = false
}
</script>

<template>
  <div class="w-[550px] flex justify-start items-center">
    <div v-if="images.length === 0" class="text-center py-8">
      <p>Nenhuma imagem disponível</p>
    </div>

    <div v-else class="flex flex-row h-[300px] items-start gap-4">
      <!-- imagens da lateral esquerda -->
      <div class="flex flex-col gap-2">
        <div
          v-for="(item, index) in images"
          :key="index"
          class="w-12 h-12 rounded-lg overflow-hidden cursor-pointer opacity-50 hover:opacity-100 transition"
          :class="{ 'opacity-100': activeIndex === index }"
          @click="select(index)"
        >
          <img :src="item" alt="Thumbnail" class="object-cover w-full h-full">
        </div>
      </div>

      <!-- Carousel principal -->
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="images"
        class="w-[450px] h-[450px]"
        @select="onSelect"
      >
        <img
          :src="item"
          class="rounded-lg object-cover w-full h-full cursor-zoom-in"
          @click="abrirModal(activeIndex)"
        >
      </UCarousel>
    </div>
  </div>

  <!-- Modal com carrossel -->
  <div
    v-if="mostrarModal"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
    @click.self="fecharModal"
  >
    <div class="relative max-w-[90%] max-h-[90%] w-full">
      <UCarousel
        v-slot="{ item }"
        :items="images"
        class="w-full max-h-[90vh]"
        :model-value="activeIndex"
        @update:modelValue="activeIndex = $event"
      >
        <img :src="item" class="rounded-lg object-contain w-full max-h-[90vh]" />
      </UCarousel>
      <button
        class="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full px-3 py-1"
        @click="fecharModal"
      >
        <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>