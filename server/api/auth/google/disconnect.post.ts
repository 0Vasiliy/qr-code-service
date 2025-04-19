import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Здесь будет логика отключения Google аккаунта
    // Пока возвращаем заглушку
    return {
      success: true,
      message: 'Google account disconnected successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to disconnect Google account'
    }
  }
}) 