<template>
  <div class="page-center">
    <div class="login-container">
      <h2>Login</h2>
      <form action="#" method="post">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email" required placeholder="Digite seu e-mail"/>
        </div>
        <div class="input-group">
          <label for="senha">Senha</label>
          <input type="password" id="senha" name="senha" required placeholder="Digite sua senha"/>
        </div>
        <button type="submit" class="btn-login">Entrar</button>
        <div class="links">
          <NuxtLink to="/esqueceu">Esqueceu a senha?</NuxtLink>
          <NuxtLink to="/Cadastro">Cadastrar-se</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Usando o layout 'basic', onde não tem Header e Footer
definePageMeta({
  layout: 'basic',
})
</script>
<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura da viewport inteira */
  background-color: #f4f4f9;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
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

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: seagreen;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-login:hover {
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

