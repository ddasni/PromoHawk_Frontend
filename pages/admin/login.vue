<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Painel Administrativo</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>E-mail</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="admin@exemplo.com"
            required
          />
        </div>
        <div class="form-group">
          <label>Senha</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            minlength="6"
            required
          />
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? "Carregando..." : "Entrar" }}
        </button>
        <div v-if="error" class="error-message">
          {{ error }}
          <button v-if="isServerError" @click="retryLogin" class="retry-button">
            Tentar Novamente
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'basic',
})

const form = reactive({
  email: "",
  password: "",
});

const isLoading = ref(false);
const error = ref("");
const isServerError = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  error.value = "";
  isServerError.value = false;

  try {
    if (!form.email || !form.password) {
      throw new Error("Preencha todos os campos.");
    }

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tempo de conexão excedido")), 10000)
    );

    const loginPromise = useFetch("https://api.promohawk.com.br/api/adm/login", {
      method: "POST",
      body: {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data, error: fetchError } = await Promise.race([
      loginPromise,
      timeoutPromise,
    ]);

    if (fetchError.value) {
      const status = fetchError.value?.response?.status || 500;
      throw new Error(`Erro ${status}: ${fetchError.value.message}`);
    }

    const response = data.value;
    console.log("Resposta da API:", response);

    // Verificações com base na resposta real
    if (!response?.status || !response?.token || !response?.adm) {
      throw new Error(response?.message || "Resposta inválida do servidor.");
    }

    const tokenCookie = useCookie("admin_token", {
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    const userCookie = useCookie("admin_user", {
      secure: true,
    });

    tokenCookie.value = response.token;
    userCookie.value = JSON.stringify(response.adm);

    await navigateTo("/admin/admin");

  } catch (err) {
    console.error("Erro no login:", err);

    if (err.message.includes("500")) {
      error.value = "Erro interno no servidor. Verifique os dados ou tente novamente mais tarde.";
      isServerError.value = true;
    } else if (err.message.includes("Tempo")) {
      error.value = "O servidor demorou muito para responder.";
      isServerError.value = true;
    } else {
      error.value = err.message || "Erro desconhecido ao fazer login.";
    }
  } finally {
    isLoading.value = false;
  }
};

const retryLogin = () => {
  handleLogin();
};
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #2563eb;
}

button[type="submit"]:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 4px;
  color: #dc2626;
}

.retry-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>








