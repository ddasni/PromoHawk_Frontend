<template>
    <Header />
        <main class="conteudo">
            <NuxtPage />
        </main>
    <Footer />
</template>

<script setup>
    import Header from '~/components/Layout/Header/Header.vue';
    import Footer from '~/components/Layout/Footer.vue';
</script>

<style scoped>
.conteudo{
    background-color: white;
    margin: 0px 300px;
}
</style>