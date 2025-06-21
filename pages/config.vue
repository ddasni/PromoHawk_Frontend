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
          <p>No PromoHawk, transformamos a maneira como você encontra as melhores ofertas online. Somos mais que um comparador - somos seu aliado inteligente para economizar em cada compra.</p>
          <p>Desde 2020, ajudamos milhares de brasileiros a tomar decisões de compra mais inteligentes, com informações precisas e atualizadas em tempo real.</p>
        </div>
      </section>

      <section class="features-section">
        <h2 class="section-title">Como Nós Te Ajudamos</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">💎</div>
            <h3>Comparação Precisa</h3>
            <p>Analisamos preços em centenas de lojas para você comprar sempre no melhor lugar</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛒</div>
            <h3>Cupons Verificados</h3>
            <p>Descontos reais testados por nossa equipe para garantir que funcionam</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📉</div>
            <h3>Histórico Completo</h3>
            <p>Veja a variação de preços e identifique as verdadeiras promoções</p>
          </div>
        </div>
      </section>

      <section class="benefits-section">
        <h2 class="section-title">Vantagens Exclusivas</h2>
        <ul class="benefits-list">
          <li>
            <span class="check-icon">✓</span>
            <span>Cobertura nacional com as principais lojas</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Atualizações em tempo real das promoções</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Alertas personalizados para seus produtos favoritos</span>
          </li>
          <li>
            <span class="check-icon">✓</span>
            <span>Interface simples e fácil de usar</span>
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

.features-section {
  margin: 5rem 0;
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2d3748;
  font-weight: 600;
}

.feature-card p {
  color: #718096;
  font-size: 1rem;
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
  
  .features-grid {
    grid-template-columns: 1fr;
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




