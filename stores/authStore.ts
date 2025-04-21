import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '~/composables/api'

interface User {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // Инициализация из localStorage при создании store
  const initFromStorage = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  // Вызываем инициализацию сразу
  initFromStorage()

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('auth_token', newToken)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
    if (newUser) {
      localStorage.setItem('auth_user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('auth_user')
    }
  }

  const clearAuth = () => {
    setToken(null)
    setUser(null)
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await useApi().post('/auth/login', { email, password })
      if (response.token && response.user) {
        setToken(response.token)
        setUser(response.user)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка авторизации'
      error.value = errorMessage
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      clearAuth()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при выходе'
      error.value = errorMessage
      throw err
    } finally {
      loading.value = false
    }
  }

  const checkAuth = () => {
    return isAuthenticated.value
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}) 