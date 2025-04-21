import { defineEventHandler, readBody, setResponseHeaders, getMethod, setResponseStatus } from 'h3'

// Тестовые учетные данные
const TEST_USER = {
  id: 1,
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
    // Устанавливаем заголовки ответа
    setResponseHeaders(event, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'"
    })

    const method = getMethod(event)
    console.log('Login request method:', method)

    // Обработка OPTIONS запроса
    if (method === 'OPTIONS') {
      return { success: true }
    }

    // Проверяем метод запроса
    if (method !== 'POST') {
      console.log('Method not allowed:', method)
      setResponseStatus(event, 405)
      return {
        success: false,
        error: 'Method not allowed',
        method: method
      }
    }

    const body = await readBody(event)
    console.log('Login request body:', body)

    const { email, password } = body

    if (!email || !password) {
      setResponseStatus(event, 400)
      return {
        success: false,
        error: 'Email and password are required'
      }
    }

    // Проверяем учетные данные
    if (email === TEST_USER.email && password === TEST_USER.password) {
      setResponseStatus(event, 200)
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

    setResponseStatus(event, 401)
    return {
      success: false,
      error: 'Invalid email or password'
    }
  } catch (error) {
    console.error('Login error:', error)
    setResponseStatus(event, 500)
    return {
      success: false,
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}) 