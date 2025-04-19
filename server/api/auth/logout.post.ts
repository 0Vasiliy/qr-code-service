import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Здесь будет реальная логика выхода
    // Пока просто возвращаем успешный ответ
    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'Произошла ошибка при выходе из системы'
    }
  }
}) 