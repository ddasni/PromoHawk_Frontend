<template>
  <section class="perfil-loja">
    <div class="fundo"></div>
    <div class="foto-loja">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogospng.org%2Fdownload%2Famazon%2Flogo-amazon-2048.png&f=1&nofb=1&ipt=daafd515b9fc94faac98ef0f1c617678d34e257e5a4e1866f24bc92800fbdb66" alt="">
    </div>
  </section>
 
</template>

<script setup>
import Loja from "~/components/Home/Categoria.vue";
</script>

<style>
.perfil-loja {
  position: relative;
  width: 100%;
}

.fundo {
  width: 100%;
  height: 200px; /* altura do banner */
  background: #0057d9; /* cor do banner, pode ser gradiente ou imagem */
}

.foto-loja {
  position: absolute;
  top: 120px; /* Ajusta a posição vertical para sobrepor o banner */
  left: 50%;
  transform: translateX(-50%);
  width: 160px; /* tamanho do círculo */
  height: 160px;
  border-radius: 50%;
  background: white; /* borda branca ao redor da imagem */
  padding: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.foto-loja img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>