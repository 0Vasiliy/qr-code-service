import { defineEventHandler, readBody, setResponseHeaders, getMethod } from 'h3'
import { createError } from 'h3'

// Тестовый пользователь
const testUser = {
  email: 'test@example.com',
  password: 'test123',
  name: 'Test User',
  role: 'user'
}

export default defineEventHandler(async (event) => {
  // Устанавливаем CORS заголовки
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  })

  // Обработка OPTIONS запроса
  if (event.method === 'OPTIONS') {
    return { status: 'ok' }
  }

  try {
    // Проверяем метод запроса
    if (event.method !== 'POST') {
      throw createError({
        statusCode: 405,
        message: 'Метод не поддерживается'
      })
    }

    // Получаем данные из тела запроса
    const body = await readBody(event)
    console.log('Получены данные для входа:', body)

    // Проверяем наличие email и пароля
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Необходимо указать email и пароль'
      })
    }

    // Проверяем учетные данные
    if (body.email === testUser.email && body.password === testUser.password) {
      // Возвращаем успешный ответ
      return {
        status: 'success',
        data: {
          user: {
            id: 1,
            email: testUser.email,
            name: testUser.name,
            role: testUser.role
          },
          token: 'test-token-123'
        }
      }
    }

    // Если учетные данные неверны
    throw createError({
      statusCode: 401,
      message: 'Неверный email или пароль'
    })

  } catch (error: any) {
    console.error('Ошибка при авторизации:', error)
    
    // Возвращаем ошибку в формате JSON
    return {
      status: 'error',
      message: error.message || 'Ошибка при авторизации'
    }
  }
}) 