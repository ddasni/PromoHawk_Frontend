<template>
  <div>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form action="#" method="post">
            <div class="input-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" required placeholder="Digite seu e-mail">
            </div>
            <div class="input-group">
                <label for="senha">Senha</label>
                <input type="password" id="senha" name="senha" required placeholder="Digite sua senha">
            </div>
            <button type="submit" class="btn-login">Entrar</button>
            <div class="links">
                <a href="#">Esqueceu a senha?</a> | 
                <a href="#">Cadastrar-se</a>
            </div>
        </form>
    </div>
</body>


  </div>
</template>

<script lang="ts" setup>

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
    justify-content: center;  /* Alinha horizontalmente */
    align-items: center;      /* Alinha verticalmente */
    height: 100vh;            /* Altura da tela toda */
    margin: 0;                /* Remove margens do body */
}

.login-container {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 100%;
    max-width: 400px;         /* Limita a largura do formulário */
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
    background-color:seagreen;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.btn-login:hover {
    background-color:darkgreen;
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