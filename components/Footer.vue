<template>
  <body>
    <div class="footer">
      <div class="footer1">
        <div class="primary-footer">
          <img class="logo-icon" alt="" src="~/assets/images/Logo.png" />

          <div class="grupo">
            <div class="informaes">
              <div class="sobre">
                <div class="texto-e-emoji">
                  <img
                    class="vector-icon"
                    alt=""
                    src="/assets/icons/interrogacao.svg"
                  />

                  <div class="sobre1">Sobre</div>
                </div>
              </div>
              <div class="contato">
                <div class="icon-mail">
                  <img
                    class="vector-icon1"
                    alt=""
                    src="/assets/icons/email.svg"
                  />

                  <div class="contato1">Contato</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="second-footer">
          <!--linha do footer--> 

          <div class="informaes-finais">
            <div class="icone"></div>
            <div class="promohawk-todos-os">
              © 2025 PROMOHAWK. TODOS OS DIREITOS RESERVADOS
            </div>
            <div class="social">
              <img class="\assets/icons/🦆 icon _github_.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style>
.logo-icon {
  width: 660px;
  height: 190px;
  object-fit: cover;
}
.vector-icon {
  width: 15px;
  position: relative;
  height: 15px;
}
.sobre1 {
  position: relative;
  font-weight: 600;
}
.texto-e-emoji {
  width: 80px;
  height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.sobre {
  width: 115px;
  border-radius: 20px;
  background-color: #fff;
  height: 30px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 6px 20px;
  box-sizing: border-box;
}
.vector-icon1 {
  width: 16px;
  position: relative;
  height: 16px;
  z-index: 0;
}
.contato1 {
  width: 58.7px;
  position: relative;
  font-weight: 600;
  display: inline-block;
  height: 16px;
  flex-shrink: 0;
  z-index: 1;
}
.vector-icon2 {
  width: 16.64%;
  position: absolute;
  margin: 0 !important;
  height: 66.52%;
  top: 16.67%;
  right: 81.7%;
  bottom: 16.81%;
  left: 1.67%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  z-index: 2;
}
.icon-mail {
  width: 110px;
  height: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 5px;
}
.contato {
  width: 155px;
  border-radius: 20px;
  background-color: #fff;
  height: 30px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 6px 20px;
  box-sizing: border-box;
  text-align: center;
}
.informaes {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 253px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
}
.grupo {
  width: 253px;
  position: relative;
  height: 30px;
}
.primary-footer {
  height: 230px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.diviso-icon {
  width: 1074px;
  position: relative;
  height: 2px;
  object-fit: contain;
  opacity: 0.1;
}
.icone {
  width: 110px;
  height: 30px;
  overflow: hidden;
  flex-shrink: 0;
}
.promohawk-todos-os {
  width: 371px;
  position: relative;
  line-height: 14px;
  display: inline-block;
  height: 14px;
  flex-shrink: 0;
}
.icon-github {
  width: 25px;
  position: relative;
  max-height: 100%;
}
.social {
  width: 110px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.informaes-finais {
  width: 1074px;
  height: 30px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 240px;
}
.second-footer {
  width: 1074px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  text-align: center;
  font-family: "DM Sans";
}
.footer1 {
  position: absolute;
  top: 0px;
  left: 183px;
  width: 1074px;
  height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}
.footer {
  width: 100%;
  position: relative;
  background-color: #fff;
  height: 300px;
  overflow: hidden;
  text-align: left;
  font-size: 14px;
  color: #737373;
  font-family: Inter;
}
</style>
