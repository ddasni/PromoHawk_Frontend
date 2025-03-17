

<template>
<body>
  <div class="header">
    <div class="estrutura-do-header">
      <div class="pesquisar">
        <div class="sample">
          <div class="item">
            <input type="text" class="search-input" placeholder="Pesquisar...">
          </div>
          <div class="icon">
            <button class="search-button">
              <img class="search-icon" alt="ícone de pesquisa" src="~/assets/icons/search.svg" />
            </button>
          </div>
        </div>
      </div>
      <img class="logo-icon" alt="Logo" src="~/assets/images/Logo.png" />

      <div class="nav-list">
        <div class="link">
          <div class="master-link">
            <div class="incio"><NuxtLink to="/">início</NuxtLink></div>
          </div>
        </div>
        <div class="link">
          <div class="master-link">
            <div class="incio"><NuxtLink to="/Categorias">Categorias</NuxtLink></div>
          </div>
        </div>
        <div class="link">
          <div class="master-link">
            <div class="incio"><NuxtLink to="/lojas">Lojas</NuxtLink></div>
          </div>
        </div>
        <div class="link">
          <div class="master-link">
            <div class="incio"><NuxtLink to="/Cupons">Cupons</NuxtLink></div>
          </div>
        </div>
        <img class="user-icon" alt="ícone de usuário" src="~/assets/icons/User.svg" />
      </div>
    </div>
  </div>

  
</body>


</template>

<script>
  
    import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

export default {
  data() {
    return {
      searchQuery: '', // Variável para armazenar o valor da pesquisa
    };
  },
  methods: {
    handleSearchClick() {
      if (this.searchQuery) {
        alert('Você pesquisou por: ' + this.searchQuery);
      } else {
        alert('Por favor, insira um termo de pesquisa!');
      }
    },
  },
};
  </script>

<style>


.search {
  position: relative;
  line-height: 24px;
}

.item {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 10px;
}

.search-icon {
  width: 24px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
}

.icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
}

.search-button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.sample {
  width: 450px;
  border-radius: 32px;
  background-color: #eaeaea;
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 8px;
  box-sizing: border-box;
  gap: 16px;
}

.pesquisar {
  width: 460px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.search-input {
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #333;
}

.search-input::placeholder {
  color: #888;
}

.logo-icon {
  width: 106px;
  height: 120px;
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
  max-height: 100%;
}

.nav-list {
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  text-align: center;
  font-size: 17px;
  color: #170f49;
}

.estrutura-do-header {
  width: 1440px;
  height: 115px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 116px;
  box-sizing: border-box;
  gap: 130px;
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
  padding: 10px 0px;
  box-sizing: border-box;
  text-align: left;
  font-size: 23px;
  color: #abb7c2;
  font-family: Roboto;
}

</style>
