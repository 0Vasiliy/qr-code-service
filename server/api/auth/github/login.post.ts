import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Здесь будет реальная реализация OAuth с GitHub
    // Пока что возвращаем тестового пользователя
    return {
      success: true,
      user: {
        id: 3,
        name: 'GitHub User',
        email: 'github@example.com',
        emailVerified: true,
        googleConnected: false,
        githubConnected: true
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'GitHub login failed'
    }
  }
}) 