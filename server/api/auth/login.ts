import { defineEventHandler, readBody, setResponseHeaders, getMethod } from 'h3'
import { createError } from 'h3'

// Тестовые учетные данные
const TEST_USER = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123',
  emailVerified: true,
  role: 'user',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
}

export default defineEventHandler(async (event) => {
  try {
    console.log('Получен запрос на авторизацию')
    
    // Устанавливаем заголовки ответа
    setResponseHeaders(event, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      'Access-Control-Allow-Credentials': 'true'
    })

    const method = getMethod(event)
    console.log('Метод запроса:', method)

    // Обработка OPTIONS запроса
    if (method === 'OPTIONS') {
      console.log('Обработка OPTIONS запроса')
      return { success: true }
    }

    // Проверяем метод запроса
    if (method !== 'POST') {
      console.error('Неподдерживаемый метод:', method)
      throw createError({
        statusCode: 405,
        message: 'Метод не поддерживается'
      })
    }

    const body = await readBody(event)
    console.log('Получены данные:', { email: body.email, password: body.password ? '***' : undefined })
    const { email, password } = body

    if (!email || !password) {
      console.error('Отсутствуют обязательные поля')
      throw createError({
        statusCode: 400,
        message: 'Email и пароль обязательны'
      })
    }

    // Проверяем учетные данные
    console.log('Проверка учетных данных:', {
      receivedEmail: email,
      expectedEmail: TEST_USER.email,
      passwordMatch: password === TEST_USER.password
    })

    if (email === TEST_USER.email && password === TEST_USER.password) {
      console.log('Успешная авторизация для пользователя:', email)
      return {
        success: true,
        user: {
          id: TEST_USER.id,
          name: TEST_USER.name,
          email: TEST_USER.email,
          emailVerified: TEST_USER.emailVerified,
          role: TEST_USER.role,
          createdAt: TEST_USER.createdAt,
          lastLogin: TEST_USER.lastLogin
        },
        token: 'test-token-123'
      }
    }

    console.error('Неверные учетные данные для:', email)
    throw createError({
      statusCode: 401,
      message: 'Неверный email или пароль'
    })
  } catch (error: any) {
    console.error('Ошибка авторизации:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка сервера'
    })
  }
}) 