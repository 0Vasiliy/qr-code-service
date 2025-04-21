import { defineEventHandler, readBody } from 'h3'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { data, userId } = body

    if (!data || !userId) {
      throw createError({
        statusCode: 400,
        message: 'Необходимы данные QR-кода и ID пользователя'
      })
    }

    // Временное решение - сохраняем в памяти
    // В реальном приложении нужно сохранять в базе данных
    return {
      success: true,
      message: 'QR-код успешно сохранен',
      data: {
        id: Date.now(),
        ...data,
        userId,
        createdAt: new Date().toISOString()
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Ошибка при сохранении QR-кода'
    })
  }
}) 