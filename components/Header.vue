<script>
export default {
  data() {
    return {
      searchQuery: "", // Variável para armazenar o valor da pesquisa
    };
  },
  methods: {
    handleSearchClick() {
      if (this.searchQuery) {
        alert("Você pesquisou por: " + this.searchQuery);
      } else {
        alert("Por favor, insira um termo de pesquisa!");
      }
    },
  },
};
</script>

<template>
  <div class="header">
    <div class="pesquisa">
      <input type="text" class="search-input" placeholder="Pesquisar..." />
      <div class="search_icon">
        <img class="search_icon1" src="~/assets/icons/icon_search.svg" />
      </div>
    </div>
    <img class="logo-icon" alt="" src="~/assets/images/Logo.png" />
    <div class="paginas-link">
      <div class="link">
        <NuxtLink to="/" class="txt_link">início</NuxtLink>
      </div>
      <div class="link">
        <NuxtLink to="/Cupons" class="txt_link">Cupons</NuxtLink>
      </div>
      <div class="link">
        <NuxtLink to="/Categorias" class="txt_link">Categorias</NuxtLink>
      </div>
      <div class="link">
        <NuxtLink to="/Lojas" class="txt_link">Lojas</NuxtLink>
      </div>
      <div class="link">
        <img class="user-icon" alt="" src="~/assets/icons/User.svg" />
      </div>
    </div>
  </div>
</template>

<style>
.header {
  	width: 100%;
  	position: relative;
  	height: 100px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 0px 116px;
  	box-sizing: border-box;
  	gap: 130px;
  	text-align: center;
  	font-size: 17px;
  	color: #000;
  	font-family: Roboto;
}

.pesquisa {
  width: 400px;
  border-radius: 30px;
  background-color: #c8c8c8;
  height: 50px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
}

.search-input {
  width: 100%; 
  height: 40px; 
  padding: 10px; 
  font-size: 16px; 
  background: transparent;
  border: none;
  outline: none;
}

.search-input::placeholder {
  font-size: 16px; 
  color: #000000; 
}

.search_icon {
  	width: 30px;
  	height: 30px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
}

.search_icon1 {
  	width: 30px;
  	position: relative;
  	max-height: 100%;
}

.logo-icon {
  	width: 100px;
  	position: relative;
  	height: 100px;
  	overflow: hidden;
  	flex-shrink: 0;
  	object-fit: cover;
}

.paginas-link {
  	width: 400px;
  	height: 100px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	gap: 20px;
}

.link {
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
}

.txt_link {
  	position: relative;
  	line-height: 23.8px;
    color: rgb(0, 0, 0);
    text-decoration: none
}

.user-icon {
  	width: 30px;
  	position: relative;
  	height: 30px;
}
</style>