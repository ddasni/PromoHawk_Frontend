<template>
    <button :class="[BotaoClass, CorClass]"> {{ nome }} </button>
</template>

<script setup>
    import { computed, toRefs } from 'vue'

    const props = defineProps ({
        nome: {
            type: String,
            default: 'Button',
        },
        size: {
            type: String,
            default: 'md',
        },
        cor: {
            type: String,
            default: 'primary',
        },
    })

    const { nome, size, cor } = toRefs(props)

    const BotaoClass = computed(() => {
        return {
            'px-2 py-1 text-sm': size.value === 'sm',
            'px-4 py-2 text-md': size.value === 'md',
            'px-3 py-3 text-lg': size.value === 'lg',
        }
    })

    const CorClass = computed(() => {
        return {
            'bg-blue-500 text-white': cor.value === 'primary',
            'bg-red-500 text-white': cor.value === 'dois',
            'bg-green-500 text-white': cor.value === 'tres',
        }
    })
</script>

<style scoped>
    
</style>