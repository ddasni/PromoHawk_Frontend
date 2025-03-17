<template>
  <body>
    <div class="header">
      <div class="estrutura-do-header">
        <div class="pesquisar">
          <div class="sample">
            <div class="item">
              <div class="search">Search ...</div>
            </div>
            <div class="icon">
              <img class="search-icon" alt="" src="~/assets/icons/search.svg" />
            </div>
          </div>
        </div>
        <img class="logo-icon" alt="" src="~/assets/images/Logo.png" />

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
              <div class="incio">Cupons</div>
            </div>
          </div>
          <img class="user-icon" alt="" src="~/assets/icons/User.svg" />
        </div>
      </div>
    </div>
  </body>
</template>

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
  position: relative;
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
.sample {
  width: 450px;
  border-radius: 32px;
  background-color: #eaeaea;
  height: 60px;
  overflow: hidden;
  flex-shrink: 0;
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
.logo-icon {
  width: 106px;
  position: relative;
  height: 120px;
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
