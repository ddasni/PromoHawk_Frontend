<template>
  <div v-if="ratingData" class="w-full bg-white p-4 md:p-6 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Avaliações dos usuários</h2>
    
    <!-- Rating médio -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
      <div class="flex items-center mb-3 sm:mb-0">
        <div class="flex mr-2">
          <template v-for="star in 5" :key="star">
            <Icon
              :name="star <= Math.round(ratingData.average) ? 'material-symbols:star' : 'material-symbols:star-outline'"
              class="w-6 h-6 md:w-7 md:h-7"
              :class="star <= Math.round(ratingData.average) ? 'text-yellow-400' : 'text-gray-300'"
            />
          </template>
        </div>
        <span class="text-lg font-medium text-gray-800 ml-1">
          {{ ratingData.average.toFixed(1) }}
        </span>
      </div>
      <span class="text-sm text-gray-500">
        ({{ ratingData.totalRatings }} avaliações)
      </span>
    </div>

    <!-- Barras de distribuição -->
    <div class="space-y-3">
      <div v-for="(count, index) in ratingData.distribution" :key="index" class="flex items-center">
        <span class="w-16 text-sm font-medium text-gray-700">
          {{ 5 - index }} estrela{{ 5 - index !== 1 ? 's' : '' }}
        </span>
        <div class="flex-1 h-3 mx-2 sm:mx-4 bg-gray-100 rounded-full">
          <div
            class="h-3 bg-yellow-400 rounded-full"
            :style="`width: ${(count / ratingData.totalRatings) * 100}%`"
          ></div>
        </div>
        <span class="w-10 text-right text-sm font-medium text-gray-700">
          {{ Math.round((count / ratingData.totalRatings) * 100) }}%
        </span>
      </div>
    </div>
  </div>
  
  <div v-else class="w-full bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
    Nenhuma avaliação disponível ainda.
  </div>
</template>

<script setup>
const props = defineProps({
  reviews: {
    type: Array,
    required: true
  }
})

const ratingData = computed(() => {
  if (!props.reviews || props.reviews.length === 0) {
    return null
  }

  // Calcular distribuição de estrelas (5 a 1)
  const distribution = [0, 0, 0, 0, 0] // [5-star, 4-star, 3-star, 2-star, 1-star]
  
  props.reviews.forEach(review => {
    const rating = review.avaliacao_produto
    if (rating >= 1 && rating <= 5) {
      distribution[5 - rating]++ // 5-star está no índice 0, 1-star no índice 4
    }
  })

  // Calcular média
  const totalRatings = props.reviews.length
  const sum = props.reviews.reduce((acc, review) => acc + review.avaliacao_produto, 0)
  const average = sum / totalRatings

  return {
    distribution,
    totalRatings,
    average
  }
})
</script>