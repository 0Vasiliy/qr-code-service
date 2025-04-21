import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '../composables/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const api = useApi()

  // Инициализация из localStorage
  const initFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          if (typeof parsedUser === 'object' && parsedUser !== null) {
            user.value = parsedUser
          } else {
            throw new Error('Invalid user data format')
          }
        } catch (e) {
          console.error('Ошибка при парсинге данных пользователя:', e)
          localStorage.removeItem('user')
        }
      }
      
      if (storedToken) {
        token.value = storedToken
      }
    } catch (e) {
      console.error('Ошибка при инициализации из localStorage:', e)
    }
  }

  // Вход в систему
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    
    try {
      console.log('Попытка входа:', { email })
      const response = await api.post('/auth/login', { email, password })
      console.log('Ответ сервера:', response)

      if (response.status === 'success' && response.data) {
        user.value = response.data.user
        token.value = response.data.token
        
        // Сохраняем в localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        
        return true
      } else {
        throw new Error(response.message || 'Ошибка при входе')
      }
    } catch (err: any) {
      console.error('Ошибка при входе:', err)
      error.value = err.message || 'Ошибка при входе'
      return false
    } finally {
      loading.value = false
    }
  }

  // Выход из системы
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // Проверка авторизации
  const isAuthenticated = () => {
    return !!token.value
  }

  return {
    user,
    token,
    loading,
    error,
    initFromStorage,
    login,
    logout,
    isAuthenticated
  }
}) 