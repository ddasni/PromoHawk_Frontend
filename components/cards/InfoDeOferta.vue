<script setup>

</script>


<template>
  <div class="content">
    <div class="superior">
        <div class="titulo-e-rating">
            <div class="samsung-s25-ultra">Samsung S25 Ultra</div>
            <div class="rating">
                <div class="star-parent">
                    <img class="frame-child" alt="" src="Star 1.svg">
                    <img class="frame-child" alt="" src="Star 2.svg">
                    <img class="frame-child" alt="" src="Star 3.svg">
                    <img class="frame-child" alt="" src="Star 4.svg">
                    <img class="frame-child1" alt="" src="Star 5.svg">
                </div>
                <div class="div">
                    <span>4.5/</span>
                    <span class="span">5</span>
                </div>
            </div>
        </div>
    <div class="more">
        <div class="share-wrapper">
            <img class="share-icon" alt="" src="share.svg">
        </div>
        <div class="div1">More</div>
    </div>
    </div>

    <div class="linha">
        <div class="linha-child">
        </div>
    </div>

    <div class="info">
        <div class="texto-e-preo">
            <div class="menor-preo-via-container">
                <span>menor preço</span>
                <span class="via-amazon"> via Amazon</span>
            </div>
            <div class="preo">R$ 4.800,00 à vista</div>
            <div class="parcelamento">10 x R$ 480,00 - sem juros</div>
        </div>
        <div class="inferior">
            <div class="boto">
                <div class="texto">Ver opções de compra</div>
            </div>
            <div class="boto-favoritar">
                <div class="mdiheart-outline">
                <img class="vector-icon" alt="" src="Vector.svg">
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style scoped>
.samsung-s25-ultra {
  	position: relative;
  	letter-spacing: 0.18px;
  	font-weight: 600;
}
.frame-child {
  	width: 24.7px;
  	position: relative;
  	height: 24.7px;
}
.frame-child1 {
  	width: 11.8px;
  	position: relative;
  	height: 22.4px;
}
.star-parent {
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
  	gap: 7.1px;
}
.span {
  	color: #3f803a;
}
.div {
  	position: relative;
}
.rating {
  	width: 200px;
  	height: 26px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: flex-start;
  	gap: 16px;
  	font-size: 16px;
  	font-family: Satoshi;
}
.titulo-e-rating {
  	width: 371px;
  	height: 110px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: column;
  	align-items: flex-start;
  	justify-content: flex-start;
  	padding: 10px 0px 0px;
  	box-sizing: border-box;
  	gap: 10px;
}
.share-icon {
  	width: 24px;
  	position: relative;
  	height: 24px;
  	overflow: hidden;
  	flex-shrink: 0;
}
.share-wrapper {
  	border-radius: 37.33px;
  	background-color: rgba(157, 157, 157, 0.04);
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 24px;
}
.div1 {
  	position: relative;
  	line-height: 15px;
}
.more {
  	height: 110px;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: flex-end;
  	gap: 8px;
  	font-size: 12px;
  	color: #3d5a80;
  	font-family: Inter;
}
.superior {
  	align-self: stretch;
  	height: 110px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: flex-start;
  	padding: 0px 10px;
  	box-sizing: border-box;
  	gap: 40px;
}
.linha-child {
  	width: 584px;
  	position: relative;
  	border-top: 1px solid rgba(151, 151, 151, 0.7);
  	box-sizing: border-box;
  	height: 1px;
}
.linha {
  	align-self: stretch;
  	overflow: hidden;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 10px;
}
.via-amazon {
  	color: #4e4e4e;
}
.menor-preo-via-container {
  	align-self: stretch;
  	position: relative;
  	letter-spacing: 0.18px;
  	font-weight: 600;
}
.preo {
  	align-self: stretch;
  	position: relative;
  	font-size: 43px;
  	letter-spacing: 0.18px;
  	font-weight: 600;
  	color: #4e4e4e;
}
.parcelamento {
  	position: relative;
  	font-size: 24px;
  	letter-spacing: 0.18px;
  	font-weight: 600;
  	color: #595959;
}
.texto-e-preo {
  	align-self: stretch;
  	height: 160px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: column;
  	align-items: flex-start;
  	justify-content: flex-start;
  	padding: 0px 10px;
  	box-sizing: border-box;
  	gap: 5px;
}
.texto {
  	position: relative;
  	font-weight: 600;
}
.boto {
  	width: 355px;
  	border-radius: 20px;
  	background-color: #029952;
  	height: 76px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 16px 12px;
  	box-sizing: border-box;
}
.vector-icon {
  	width: 40px;
  	position: relative;
  	max-height: 100%;
}
.mdiheart-outline {
  	align-self: stretch;
  	flex: 1;
  	overflow: hidden;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
  	padding: 3px 2px;
}
.boto-favoritar {
  	width: 70px;
  	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  	border-radius: 6px;
  	border: 1px solid #dee2e7;
  	box-sizing: border-box;
  	height: 70px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: flex-start;
  	padding: 8px;
}
.inferior {
  	align-self: stretch;
  	height: 116px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 10px 30px;
  	box-sizing: border-box;
  	gap: 30px;
  	text-align: center;
  	font-size: 25px;
  	color: #4e4e4e;
  	font-family: Poppins;
}
.info {
  	align-self: stretch;
  	height: 326px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: column;
  	align-items: flex-start;
  	justify-content: flex-start;
  	gap: 20px;
  	font-size: 20px;
  	color: #04e67c;
}
.content {
  	width: 100%;
  	position: relative;
  	height: 516px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: column;
  	align-items: flex-start;
  	justify-content: flex-start;
  	padding: 30px 0px 10px;
  	box-sizing: border-box;
  	gap: 15px;
  	text-align: left;
  	font-size: 36px;
  	color: #4e4e4e;
  	font-family: 'Nunito Sans';
}
</style>