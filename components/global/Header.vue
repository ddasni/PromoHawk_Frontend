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
      
        <!-- Ícone de usuário que, ao ser clicado, abre o menu -->
        <a href="javascript:void(0);" @click="toggleMenu" ref="userIcon">
        <img class="user-icon" alt="User Icon" src="~/assets/icons/User.svg" />
        </a>

        <!-- Menu de opções que aparece quando isMenuVisible é true -->
        <ul v-if="isMenuVisible" class="menu-opcoes" :style="menuStyles" v-click-outside="closeMenu">
          <li @click="navigateTo('pagina1.html')">Página 1</li>
          <li @click="navigateTo('pagina2.html')">Página 2</li>
          <li @click="navigateTo('pagina3.html')">Página 3</li>
        </ul>
      </div>
    </div>
  </div> 
</template>

<style>
/* Estilos do ícone de usuário */
.user-icon {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

/* Estilos do menu suspenso */
.menu-opcoes {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  list-style: none;
  margin: 0;
  width: 150px;
}

.menu-opcoes li {
  padding: 10px;
  cursor: pointer;
}

.menu-opcoes li:hover {
  background-color: #f0f0f0;
}

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

<script>
// Importando a diretiva v-click-outside
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside, // Registrando a diretiva
  },
  data() {
    return {
      isMenuVisible: false, // Controle da visibilidade do menu
      menuStyles: {
        top: "0px", // A posição vertical inicial
        left: "0px", // A posição horizontal inicial
      },
    };
  },
  methods: {
    // Função para alternar a visibilidade do menu
    toggleMenu() {
      // Se o menu for visível, então calcular a posição
      this.isMenuVisible = !this.isMenuVisible;
      if (this.isMenuVisible) {
        this.calculateMenuPosition();
      }
    },
    // Função para calcular a posição do menu em relação ao ícone
    calculateMenuPosition() {
      const iconElement = this.$refs.userIcon; // Pega o ícone do usuário
      const rect = iconElement.getBoundingClientRect(); // Obtém as coordenadas do ícone

      // Calcula a posição do menu para aparecer abaixo do ícone
      this.menuStyles.top = `${rect.bottom + window.scrollY}px`; // O menu aparece logo abaixo
      this.menuStyles.left = `${rect.left + window.scrollX}px`; // Alinha o menu à esquerda do ícone
    },
    // Função para navegar para a URL
    navigateTo(url) {
      window.location.href = url; // Redireciona para a página especificada
      this.isMenuVisible = false; // Oculta o menu após a navegação
    },
    // Função para fechar o menu
    closeMenu() {
      this.isMenuVisible = false;
    },
  },
};
</script>