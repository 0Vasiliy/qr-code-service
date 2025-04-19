/**
 * Хранилище аутентификации
 * Управляет состоянием авторизации пользователя и предоставляет методы для работы с ней
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

// Интерфейс пользователя
interface User {
  id: number
  name: string
  email: string
  emailVerified: boolean
  googleConnected: boolean
  githubConnected: boolean
}

export const useAuthStore = defineStore('auth', () => {
  // Состояние пользователя
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Метод входа пользователя
   * @param email - Email пользователя
   * @param password - Пароль пользователя
   * @returns Объект пользователя при успешном входе
   */
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Invalid email or password')
      }

      user.value = data.user
      isAuthenticated.value = true
      return data.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Метод регистрации пользователя
   * @param email - Email пользователя
   * @param password - Пароль пользователя
   * @param name - Имя пользователя
   * @returns Объект пользователя при успешной регистрации
   */
  const register = async (email: string, password: string, name: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Registration failed')
      }

      user.value = data.user
      isAuthenticated.value = true
      return data.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Метод выхода пользователя
   * Очищает состояние пользователя и сбрасывает авторизацию
   */
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      const data = await response.json()
      if (data.success) {
        user.value = null
        isAuthenticated.value = false
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  /**
   * Метод отправки письма для подтверждения email
   */
  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST'
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Verification email error:', error)
      throw error
    }
  }

  /**
   * Метод подключения аккаунта Google
   */
  const connectGoogle = async () => {
    try {
      const response = await fetch('/api/auth/google/connect', {
        method: 'POST'
      })

      const data = await response.json()
      if (data.success) {
        if (user.value) {
          user.value = {
            ...user.value,
            googleConnected: true
          }
        }
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Google connection error:', error)
      throw error
    }
  }

  /**
   * Метод отключения аккаунта Google
   */
  const disconnectGoogle = async () => {
    try {
      const response = await fetch('/api/auth/google/disconnect', {
        method: 'POST'
      })

      const data = await response.json()
      if (data.success) {
        if (user.value) {
          user.value = {
            ...user.value,
            googleConnected: false
          }
        }
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Google disconnection error:', error)
      throw error
    }
  }

  /**
   * Метод подключения аккаунта GitHub
   */
  const connectGithub = async () => {
    try {
      const response = await fetch('/api/auth/github/connect', {
        method: 'POST'
      })

      const data = await response.json()
      if (data.success) {
        if (user.value) {
          user.value = {
            ...user.value,
            githubConnected: true
          }
        }
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('GitHub connection error:', error)
      throw error
    }
  }

  /**
   * Метод отключения аккаунта GitHub
   */
  const disconnectGithub = async () => {
    try {
      const response = await fetch('/api/auth/github/disconnect', {
        method: 'POST'
      })

      const data = await response.json()
      if (data.success) {
        if (user.value) {
          user.value = {
            ...user.value,
            githubConnected: false
          }
        }
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('GitHub disconnection error:', error)
      throw error
    }
  }

  /**
   * Метод входа через Google
   * @returns Объект пользователя при успешном входе
   */
  const loginWithGoogle = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/auth/google/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Google login failed')
      }

      user.value = data.user
      isAuthenticated.value = true
      return data.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Google login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Метод входа через GitHub
   * @returns Объект пользователя при успешном входе
   */
  const loginWithGithub = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('/api/auth/github/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'GitHub login failed')
      }

      user.value = data.user
      isAuthenticated.value = true
      return data.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'GitHub login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    sendVerificationEmail,
    connectGoogle,
    disconnectGoogle,
    connectGithub,
    disconnectGithub,
    loginWithGoogle,
    loginWithGithub
  }
}) 