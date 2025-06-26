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
body {
    background-color: rgb(245, 245, 245);
}

.conteudo{
    margin: 10px 200px;
}
</style>