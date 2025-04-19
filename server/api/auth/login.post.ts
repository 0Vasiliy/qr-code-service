import { defineEventHandler, readBody } from 'h3'

// Тестовые учетные данные
const TEST_USER = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123',
  emailVerified: true,
  googleConnected: false,
  githubConnected: false
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    // Проверяем учетные данные
    if (email === TEST_USER.email && password === TEST_USER.password) {
      return {
        success: true,
        user: {
          id: TEST_USER.id,
          name: TEST_USER.name,
          email: TEST_USER.email,
          emailVerified: TEST_USER.emailVerified,
          googleConnected: TEST_USER.googleConnected,
          githubConnected: TEST_USER.githubConnected
        }
      }
    }

    return {
      success: false,
      error: 'Invalid email or password'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Login failed'
    }
  }
}) 