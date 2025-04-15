<template>
  <div class="Header">
    <Nav/>

    <img src="/assets/images/Logo.png" alt="Logo">
    
    <Search/>
    <User/>
  </div>
</template>

<script setup>
import Nav from '~/components/Header/NavigationMenu.vue';
import Search from '../Header/Search.vue';
import User from '~/components/Header/user_icon.vue';
</script>

<style scoped>
.Header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 160px;
  background-color: blueviolet;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.Header img {
  height: 90px; /* altura da logo */
  object-fit: contain;
}

.estrutura {
 width: 100px;
}
</style>