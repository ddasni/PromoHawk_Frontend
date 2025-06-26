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
    background-color: rgb(250, 250, 250);
}

.conteudo{
    margin: 10px 200px;
}
</style>