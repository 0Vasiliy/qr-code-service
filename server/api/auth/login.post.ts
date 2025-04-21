import { defineEventHandler, readBody } from 'h3'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email и пароль обязательны'
      })
    }

    // Временный код для тестирования
    if (email === 'test@example.com' && password === 'password') {
      return {
        token: 'test-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com'
        }
      }
    }

    throw createError({
      statusCode: 401,
      message: 'Неверный email или пароль'
    })
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка сервера'
    })
  }
}) 