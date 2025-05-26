<template>
  <br>
  <Carousel/>
  <br>
  <br>
  <Divisor titulo="Categorias" actionTexto="ver mais >" link="" />
    <Categoria size="sm" nome="Eletrônicos" imgSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fvetores-premium%2Fgrupo-de-dispositivos-eletronicos-conjunto-de-icones-desenho-de-ilustracao-vetorial_1250153-9784.jpg&f=1&nofb=1&ipt=7461f6dd01d87d4a820c2cf3a392a6e5504c34d504810d9c29c917fea9e032b1"/>
  <br />
  <Divisor titulo="Destaques" actionTexto="ver mais >" link="" />
    <Produto imagem="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage-us.samsung.com%2FSamsungUS%2Fhome%2Fmobile%2Fgalaxy-fold%2Fgalaxy-fold-silver%2F092419%2F4-SM_F900_GalaxyFold_Front115_Silver_RGB.jpg&f=1&nofb=1&ipt=9c741d86e1f8e15c60653341cbdc9d7c5ddf40bc1577797cd53a1ac897381874"/>
  <br />
  <Divisor titulo="Cupons" actionTexto="ver mais >" link="" />
  <Cupons/>
</template>

<script setup>
import Carousel from '~/components/Home/Carousel.vue'
import Divisor from "~/components/Home/Divisor.vue";
import Categoria from "~/components/Home/Categoria.vue";
import Produto from "~/components/Common/Cards/Card_produto.vue";
import Cupons from "~/components/Common/Cards/Card_cupom.vue";
</script>

<style></style>
