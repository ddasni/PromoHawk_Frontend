<template>
  <div class="Header">
    <Nav/>

    <img src="/assets/images/Logo.png" alt="Logo">
    
    <div class="direita">
      <Search/>
      <User/>
    </div>
  </div>
</template>

<script setup>
import Nav from '~/components/Layout/Header/HeaderNav.vue';
import Search from '~/components/Layout/Header/HeaderSearch.vue';
import User from '~/components/Layout/Header/HeaderDropdown.vue';
</script>

<style scoped>
.Header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 200px;
  background-color: rgb(245.245.245);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.Header img {
  height: 90px; /* altura da logo */
  object-fit: contain;
}

.direita {
 width: 390px;
 align-items: center;
 gap: 20px;
 display: flex;
}
</style>