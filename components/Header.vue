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
  	line-height: 23.8px;
}
.vector-icon {
  	width: 30px;
  	position: relative;
  	max-height: 100%;
}
.search1 {
  	width: 30px;
  	height: 30px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
}
.estrutura {
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
  	gap: 280px;
}
.pesquisar {
  	width: 400px;
  	height: 100px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
}
.logo-icon {
  	width: 100px;
  	position: relative;
  	height: 100px;
  	overflow: hidden;
  	flex-shrink: 0;
  	object-fit: cover;
}
.line-roundedpassword-icon {
  	width: 20px;
  	position: relative;
  	height: 20px;
  	overflow: hidden;
  	flex-shrink: 0;
  	display: none;
}
.link {
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
}
.line-roundedchevron-down2 {
  	width: 20px;
  	position: relative;
  	height: 20px;
  	overflow: hidden;
  	flex-shrink: 0;
}
.vector-icon1 {
  	width: 30px;
  	position: relative;
  	height: 30px;
}
.nav-list {
  	width: 400px;
  	height: 100px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	gap: 20px;
}
.estrutura-do-header {
  	width: 1440px;
  	height: 100px;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 0px 116px;
  	box-sizing: border-box;
  	gap: 130px;
}
.property-1desktop {
  	width: 100%;
  	position: relative;
  	background-color: #fff;
  	height: 100px;
  	overflow: hidden;
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  	padding: 10px 0px;
  	box-sizing: border-box;
  	text-align: center;
  	font-size: 17px;
  	color: #000;
  	font-family: Roboto;
}
</style>
