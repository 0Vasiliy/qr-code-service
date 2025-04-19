import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Здесь будет реальная реализация OAuth с Google
    // Пока что возвращаем тестового пользователя
    return {
      success: true,
      user: {
        id: 2,
        name: 'Google User',
        email: 'google@example.com',
        emailVerified: true,
        googleConnected: true,
        githubConnected: false
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Google login failed'
    }
  }
}) 