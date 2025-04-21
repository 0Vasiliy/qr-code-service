import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '../composables/api'

interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  role: string
  createdAt: string
  lastLogin: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // Инициализация из localStorage при создании store
  const initFromStorage = () => {
    try {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')
      
      if (storedToken) {
        token.value = storedToken
      }
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser && typeof parsedUser === 'object') {
            user.value = parsedUser
          }
        } catch (e) {
          console.error('Ошибка при парсинге данных пользователя:', e)
          localStorage.removeItem('auth_user')
        }
      }
    } catch (e) {
      console.error('Ошибка при инициализации из localStorage:', e)
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
      console.log('Попытка входа с данными:', { email })
      const response = await useApi().post('/auth/login', { email, password })
      console.log('Ответ сервера:', response)

      if (response && response.success && response.token && response.user) {
        console.log('Успешная авторизация')
        setToken(response.token)
        setUser(response.user)
        return true
      } else {
        console.error('Неверный формат ответа:', response)
        throw new Error(response?.message || 'Неверный формат ответа')
      }
    } catch (err) {
      console.error('Ошибка при входе:', err)
      const errorMessage = err instanceof Error ? err.message : 'Ошибка авторизации'
      error.value = errorMessage
      throw new Error(errorMessage)
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
      throw new Error(errorMessage)
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