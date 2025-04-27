<template>
<div class="cupom">
<img class="loja-icon" alt="" src=""">
<div class="divisao">
<div class="divisao-child">
</div>
</div>
<div class="estrutura">
<div class="titulo">
<div class="off">50% OFF</div>
<div class="em-games">Em games</div>
</div>
<div class="cupom1">
<div class="promo-codigo">Promo codigo:</div>
<div class="cupom-child">
</div>
</div>
</div>
</div>

<br><br>

<div class="cupom">
	<img class="imgLoja" src="~/assets/images/Produtos/samsung/004.jpg" alt="">

	<USeparator type="dashed" orientation="vertical" class="h-35" />

	<div class="textos">
		<h1> {{ titulo }} </h1>
		<p> {{ paragrafo  }} </p>

		<div class="codigo">
			<p> Promo codigo: </p>

			<!-- componente para revelar o codigo -->
		</div>
	</div>

</div>

</template>

<script  setup>

</script>

<style scoped>

.imgLoja {
  	width: 140px;
  	border-radius: 50%;
  	max-height: 100%;
  	overflow: hidden;
  	flex-shrink: 0;
  	object-fit: cover;
}

.off {
  	position: relative;
  	line-height: 49.2px;
  	font-weight: 500;
}
.em-games {
  	position: relative;
  	font-size: 17px;
  	line-height: 23.8px;
  	font-family: Roboto;
}
.titulo {
  	align-self: stretch;
  	height: 70px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
}
.promo-codigo {
  	width: 80px;
  	position: relative;
  	line-height: 19.5px;
  	display: inline-block;
  	height: 20px;
  	flex-shrink: 0;
}
.cupom-child {
  	width: 150px;
  	position: relative;
  	background-color: #d9d9d9;
  	height: 35px;
}
.cupom1 {
  	width: 316px;
  	height: 65px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	gap: 10px;
  	font-size: 11px;
  	font-family: Roboto;
}
.estrutura {
  	width: 321px;
  	height: 141px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
  	padding: 10px 0px;
  	box-sizing: border-box;
  	gap: 5px;
}
.cupom {
  	width: 25%;
  	position: relative;
  	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  	border-radius: 10px;
  	background-color: #fff;
  	border: 1px solid #000;
  	box-sizing: border-box;
  	height: 210px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: flex-start;
  	padding: 10px 25px;
  	gap: 20px;
  	text-align: center;
  	font-size: 41px;
  	color: #000;
  	font-family: Montserrat;
}

</style>