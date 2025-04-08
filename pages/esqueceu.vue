<template>
      <div class="esqueceu-container">
        <h2>Esqueceu a senha</h2>
        <form action="#" method="post">
          <div class="input-group">
            <label for="email">E-mail/Telefone</label>
            <input type="text" id="esqueceu" required placeholder="Digite seu e-mail ou telefone"/>
          </div>
        
          <button type="submit" class="btn-esqueceu">Enviar</button>
          <div class="links">
            
          </div>
        </form>
      </div>
  
  
</template>

<script setup>
// Usando o layout 'basic', onde não tem Header e Footer
definePageMeta({
  layout: "basic",
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center; /* Alinha horizontalmente */
  align-items: center; /* Alinha verticalmente */
  height: 100vh; /* Altura da tela toda */
  margin: 0; /* Remove margens do body */
}

.esqueceu-container {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px; /* Limita a largura do formulário */
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn-esqueceu {
  width: 100%;
  padding: 10px;
  background-color: seagreen;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-esqueceu:hover {
  background-color: darkgreen;
}

.links {
  margin-top: 10px;
}

.links a {
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>