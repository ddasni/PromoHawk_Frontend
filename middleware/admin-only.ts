export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token').value
  const isAdmin = useCookie('isAdmin').value

  // Permitir acesso livre à rota de login do admin
  if (to.path === '/admin/login') {
    // Se já estiver logado e for admin, redireciona para dashboard
    if (token && isAdmin === 'true') {
      return navigateTo('/admin')
    }
    // Senão, deixa acessar a página de login normalmente
    return
  }

  // Protege as rotas que exigem admin logado
  if (!token || isAdmin !== 'true') {
    return navigateTo('/admin/login')
  }
})






