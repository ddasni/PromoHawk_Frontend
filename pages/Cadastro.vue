<script>

</script>

<template>
 <div>
<body>
    <div class="cadastro-container">
        <h2>Cadastro</h2>
        <form action="#" method="post">
            <div class="input-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome" required placeholder="Digite seu nome">
            </div>
            <div class="input-group">
                <label for="nome-usuario">Usuário</label>
                <input type="text" id="nome-usuario" name="nome-usuario" required placeholder="Digite o seu nome de usuário">
            </div>
            <div class="input-group">
                <label for="telefone">Telefone</label>
                <input type="tel" name="telefone" placeholder="(XX) XXXXX-XXXX" required>

            </div>
            <button type="submit" class="btn-cadastro">Próximo</button>
        </form>
    </div>
</body>


  </div>
</template>

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

.cadastro-container {
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

.btn-cadastro {
    width: 100%;
    padding: 10px;
    background-color:seagreen;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.btn-cadastro:hover {
    background-color:darkgreen;
}
</style>