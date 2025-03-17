<template>
  <body>
    <body>
  <div class="footer">
    <div class="footer1">
      <div class="primary-footer">
        <img class="logo-icon" alt="Logo" src="~/assets/images/Logo.png" />

        <div class="grupo">
          <div class="informaes">
            <div class="sobre">
              <div class="texto-e-emoji">
                <img
                  class="vector-icon"
                  alt="Ícone sobre"
                  src="/assets/icons/interrogacao.svg"
                />
                <div class="sobre1">Sobre</div>
              </div>
            </div>

            <div class="contato">
              <div class="icon-mail">
                <img
                  class="vector-icon1"
                  alt="Ícone de contato"
                  src="/assets/icons/email.svg"
                />
                <div class="contato1">Contato</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="second-footer">
        <!-- Linha do footer -->
        <div class="informaes-finais">
          <div class="social">
            <img class="social-icon" src="/assets/icons/icon _github.svg" alt="GitHub" />
          </div>
          <div class="promohawk-todos-os">
            © 2025 PromoHawk. Todos os direitos reservados
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</body>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que a altura mínima da página ocupe 100% da altura da tela */
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

.content {
  flex: 1; /* Faz o conteúdo ocupar o restante da altura da página */
}

.footer {
  width: 100%;
  background-color: transparent; /* Fundo transparente */
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Alinha o conteúdo em coluna */
}

.footer-links {
  display: flex;
  justify-content: space-between; /* Espaça as seções de "Sobre" e "Contato" */
  width: 80%; /* Controla a largura do container */
  gap: 50px; /* Espaço entre os itens */
}

.footer-item {
  flex: 1; /* Cada item ocupa o mesmo espaço */
  text-align: center; /* Centraliza o texto */
}

.footer-item h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333; /* Cor do título */
}

.footer-item p {
  color: #666; /* Cor do texto */
  font-size: 14px;
}

/* Estilo para o ícone ao lado do título */
.footer-item .icon {
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* Espaço entre o ícone e o título */
}

.footer-item .icon img {
  width: 24px;
  height: 24px;
}

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
  text-align: center;
  font-size: 17px;
  color: #170f49;
}
.footer1 {
  background-color: transparent; /* Fundo transparente */
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Ajustando para que os itens do rodapé fiquem empilhados */
}

.primary-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grupo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px; /* Espaçamento entre "Sobre" e "Contato" */
  align-items: center;
}

.informaes {
  display: flex;
  justify-content: space-between;
  gap: 50px; /* Espaçamento entre as seções */
}

.sobre, .contato {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.texto-e-emoji, .icon-mail {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vector-icon, .vector-icon1 {
  width: 24px;
  height: 24px;
}

.sobre1, .contato1 {
  font-size: 16px;
  color: #333;
}

.second-footer {
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.informaes-finais {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px; /* Margem para separar o texto de direitos reservados */
}

.social img {
  width: 30px;
  height: 30px;
}

.promohawk-todos-os {
  color: #888;
  font-size: 14px;
}
</style>
