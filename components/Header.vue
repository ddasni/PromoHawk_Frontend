<script setup>

</script>

<template>
<body>
<div class="header">
<div class="header-v2">
<div class="header-v5">
<div class="container">
<div class="pesquisar">
<div class="searchbar">
<div class="content">
<div class="magnifyingglass">
<div class="magnifyingglass1">􀊫</div>
</div>
<div class="placeholder-label">Search</div>
</div>
</div>
</div>
<img class="logo-icon" alt="" src="~/assets/images/Logo.png">
<div class="nav-list">
<div class="link">
<div class="master-link">
<div class="incio">Início</div>
</div>
</div>
<div class="link">
<div class="master-link">
<div class="incio">Categorias</div>
</div>
</div>
<div class="link">
<div class="master-link">
<div class="incio">Lojas</div>
</div>
</div>
<div class="link">
<div class="master-link">
<div class="incio"><NuxtLink to="/Cupons">Cupons</NuxtLink></div>
</div>
</div>
<img class="user-icon" alt="" src="~/assets/icons/User.svg">
</div>
</div>
</div>
<div class="header-v2-child">
</div>
<div class="header-v2-item">
</div>
</div>
</div>
</body>
</template>

<style>
.magnifyingglass1 {
  	position: absolute;
  	height: 100%;
  	width: 100%;
  	top: 0%;
  	left: 0%;
  	line-height: 50px;
  	font-weight: 500;
  	display: flex;
  	align-items: center;
  	justify-content: center;
}
.magnifyingglass {
  	width: 28px;
  	position: relative;
  	height: 28px;
  	overflow: hidden;
  	flex-shrink: 0;
}
.placeholder-label {
  	flex: 1;
  	position: relative;
  	font-size: 17px;
  	line-height: 23.8px;
  	font-family: Roboto;
  	text-align: left;
}
.content {
  	align-self: stretch;
  	border-radius: 10px;
  	background-color: rgba(250, 250, 250, 0.93);
  	height: 36px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: flex-start;
  	padding: 8px;
  	box-sizing: border-box;
}
.searchbar {
  	width: 400px;
  	display: flex;
  	flex-direction: column;
  	align-items: flex-start;
  	justify-content: flex-start;
}
.pesquisar {
  	width: 400px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
}
.logo-icon {
  	width: 106px;
  	position: relative;
  	height: 106px;
  	overflow: hidden;
  	flex-shrink: 0;
  	object-fit: cover;
}
.incio {
  	position: relative;
  	line-height: 23.8px;
}
.master-link {
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: flex-start;
}
.link {
  	display: flex;
  	flex-direction: row;
  	align-items: flex-start;
  	justify-content: flex-start;
}
.user-icon {
  	width: 30px;
  	position: relative;
  	max-height: 100%;
}
.nav-list {
  	width: 400px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	gap: 32px;
  	font-size: 17px;
  	color: #170f49;
  	font-family: Roboto;
}
.container {
  	position: absolute;
  	top: 6.52px;
  	left: 97.68px;
  	width: 1240px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	gap: 165px;
}
.header-v5 {
  	position: absolute;
  	top: 0px;
  	left: 0.32px;
  	background-color: #fff;
  	width: 1439.7px;
  	height: 118px;
  	overflow: hidden;
}
.header-v2-child {
  	position: absolute;
  	top: -0.5px;
  	left: -0.18px;
  	border-top: 1px solid #eff0f6;
  	box-sizing: border-box;
  	width: 1440.7px;
  	height: 1px;
}
.header-v2-item {
  	position: absolute;
  	top: 117.55px;
  	left: -0.5px;
  	border-top: 1px solid #d9dbe9;
  	box-sizing: border-box;
  	width: 1440.7px;
  	height: 1px;
}
.header-v2 {
  	width: 1440px;
  	position: relative;
  	height: 118px;
}
.header {
  	width: 100%;
  	position: relative;
  	background-color: #fff;
  	height: 115px;
  	overflow: hidden;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 10px 160px;
  	box-sizing: border-box;
  	text-align: center;
  	font-size: 18px;
  	color: rgba(60, 60, 67, 0.6);
  	font-family: 'SF Pro Display';
}
</style>