import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Здесь будет логика отключения GitHub аккаунта
    // Пока возвращаем заглушку
    return {
      success: true,
      message: 'GitHub account disconnected successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to disconnect GitHub account'
    }
  }
}) 