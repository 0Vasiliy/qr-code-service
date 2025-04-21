import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const isAuth = authStore.checkAuth()
  
  // Если пользователь не авторизован и пытается получить доступ к защищенным страницам
  if (!isAuth && to.path !== '/auth' && to.path !== '/') {
    return navigateTo('/auth')
  }
  
  // Если пользователь авторизован и пытается получить доступ к странице авторизации
  if (isAuth && to.path === '/auth') {
    return navigateTo('/dashboard')
  }
}) 