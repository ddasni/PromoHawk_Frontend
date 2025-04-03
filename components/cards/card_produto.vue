<script setup>

</script>


<template>
    <div class="estrutura">

        <img class="imagem_principal" alt="" src="~/assets/images/Produtos/samsung/003.jpg">

        <div class="imagens-do-produto">
            <img class="imagem" alt="" src="~/assets/images/Produtos/samsung/001.jpg">
            <img class="imagem" alt="" src="~/assets/images/Produtos/samsung/004.jpg">
            <img class="imagem" alt="" src="~/assets/images/Produtos/samsung/005.jpg">
        </div>  
    </div>
</template>


<style scoped>
.estrutura {
  	width: 450px;
  	height: 400px; 
    position: relative;
  	overflow: hidden;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: flex-start;
  	gap: 15px; /* divisão/separação dos elementos na tela */
}
.imagem_principal {
    max-width: 500px;
    max-height: 400px;
  	align-self: stretch;
  	position: relative;
  	border-radius: 10px;
  	overflow: hidden;
  	flex-shrink: 0;
  	object-fit: cover;
}
.imagens-do-produto {
    height: 95px;
  	align-self: stretch;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: center;
  	gap: 15px;
}
.imagem {
    max-width: 100px;
    max-height: 80px;
    border-radius: 10px;
  	position: relative;
  	object-fit: cover;
}
</style>