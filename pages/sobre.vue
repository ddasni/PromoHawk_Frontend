<template>
  <div class="about-page">
    <div class="content-container">
      <div class="title-container">
        <h1 class="main-title">Sobre o <span class="brand">PromoHawk</span></h1>
        <p class="tagline">Seu comparador inteligente de preços, cupons e promoções</p>
      </div>

      <section class="about-section">
        <div class="section-header">
          <div class="decorative-line"></div>
          <h2>Nossa Missão</h2>
          <div class="decorative-line"></div>
        </div>
        <div class="section-content">
          <p>No PromoHawk, nossa missão é transformar a forma como você descobre e aproveita as melhores ofertas online. Mais do que um simples comparador de preços, somos seu parceiro estratégico para economizar em todas as compras.</p>
          <p>Desde 2020, temos ajudado milhares de brasileiros a fazer escolhas mais inteligentes, com dados atualizados em tempo real, histórico de preços e cupons testados por nossa equipe.</p>
        </div>
      </section>

      <section class="history-section">
        <h2 class="section-title">Nossa História</h2>
        <div class="section-content">
          <p>O PromoHawk nasceu da paixão por tecnologia e economia. Criado por um grupo de desenvolvedores e entusiastas do varejo digital, nosso objetivo sempre foi claro: ajudar pessoas a fazerem compras mais inteligentes.</p>
          <p>Combinando tecnologia de rastreamento de preços, cupons e análise de mercado, criamos uma plataforma que já impactou milhares de consumidores em todo o Brasil.</p>
          <p>Hoje, seguimos evoluindo com você, trazendo inovação, transparência e praticidade para o seu dia a dia de compras.</p>
        </div>
      </section>

      <section class="benefits-section">
        <h2 class="section-title">Por Que Escolher o PromoHawk?</h2>
        <ul class="benefits-list">
          <li>
            <span class="check-icon">✓</span>
            <span>Cobertura nacional com as maiores lojas do Brasil</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Promoções e preços atualizados em tempo real</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Alertas personalizados para seus produtos favoritos</span>
          </li>
       
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #2d3748;
  line-height: 1.7;
  min-height: 100vh;
  background-color: #fafafa;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.title-container {
  text-align: center;
  margin-bottom: 4rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.brand {
  color: #4f46e5;
  position: relative;
}

.brand:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #a78bfa);
  border-radius: 3px;
}

.tagline {
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.decorative-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
}

h2 {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
}

.section-content {
  max-width: 700px;
  margin: 0 auto;
}

.section-content p {
  margin-bottom: 1.5rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.history-section {
  margin: 5rem 0;
}

.history-section .section-content {
  max-width: 750px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.8;
}

.history-section .section-content p {
  margin-bottom: 1.5rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #a78bfa);
  margin: 0.8rem auto 0;
  border-radius: 3px;
}

.benefits-section {
  margin-top: 4rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
}

.benefits-list li {
  padding: 1rem 1.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
}

.check-icon {
  color: #4f46e5;
  font-weight: bold;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .content-container {
    padding: 2rem 1.5rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .section-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .decorative-line {
    width: 100%;
  }
}
</style>





