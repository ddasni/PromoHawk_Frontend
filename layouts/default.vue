<template>
    <Header />
        <main class="conteudo">
            <NuxtPage />
        </main>
    <Footer />
</template>

<script setup>
    import Header from '~/components/global/Header.vue';
    import Footer from '~/components/global/Footer.vue';
</script>

<style scoped>
.conteudo{
    background-color: white;
    margin: 0px 300px;
}
</style>