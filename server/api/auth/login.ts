import { defineEventHandler, readBody, setResponseHeaders, getMethod } from 'h3'

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
    setResponseHeaders(event, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })

    const method = getMethod(event)

    if (method === 'OPTIONS') {
      return { success: true }
    }

    if (method === 'GET') {
      return {
        success: true,
        message: 'API is working'
      }
    }

    if (method !== 'POST') {
      return {
        success: false,
        error: 'Method not allowed'
      }
    }

    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required'
      }
    }

    // Проверяем учетные данные
    if (email === TEST_USER.email && password === TEST_USER.password) {
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

    return {
      success: false,
      error: 'Invalid email or password'
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}) 