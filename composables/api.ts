import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

export const useApi = () => {
  // Для локальной разработки:
  // const isDev = process.env.NODE_ENV === 'development'
  // const baseURL = isDev 
  //   ? 'http://localhost:3000/api'
  //   : '/api'
  // Для GitHub Pages:
  const baseURL = '/api'

  const authStore = useAuthStore()
  const token = ref(authStore.token)

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token.value ? { 'Authorization': `Bearer ${token.value}` } : {})
  }

  const post = async (endpoint: string, data: any) => {
    try {
      console.log('Отправка POST запроса:', {
        url: `${baseURL}${endpoint}`,
        data: { ...data, password: data.password ? '***' : undefined }
      })

      // Для локальной разработки:
      // if (isDev && endpoint === '/auth/login') {
      //   if (data.email === 'test@example.com' && data.password === 'test123') {
      //     const mockResponse = {
      //       success: true,
      //       user: {
      //         id: '1',
      //         name: 'Test User',
      //         email: 'test@example.com',
      //         emailVerified: true,
      //         role: 'user',
      //         createdAt: new Date().toISOString(),
      //         lastLogin: new Date().toISOString()
      //       },
      //       token: 'test-token-123'
      //     }
      //     console.log('Локальный ответ:', mockResponse)
      //     return mockResponse
      //   } else {
      //     throw new Error('Неверный email или пароль')
      //   }
      // }

      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        credentials: 'include'
      })

      console.log('Получен ответ:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      let responseData
      try {
        const text = await response.text()
        responseData = text ? JSON.parse(text) : {}
        console.log('Данные ответа:', responseData)
      } catch (e) {
        console.error('Ошибка при парсинге JSON:', e)
        throw new Error('Ошибка при обработке ответа сервера')
      }

      if (!response.ok) {
        console.error('Ошибка API:', {
          status: response.status,
          data: responseData,
          url: `${baseURL}${endpoint}`
        })
        const errorMessage = responseData?.message || 'Ошибка сервера'
        throw new Error(errorMessage)
      }

      return responseData
    } catch (error) {
      console.error('Ошибка API:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Неизвестная ошибка при выполнении запроса')
    }
  }

  const saveQRCode = async (data: any) => {
    try {
      const response = await fetch(`${baseURL}/qr/save`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          data,
          userId: authStore.user?.id
        }),
        credentials: 'include'
      })

      let responseData
      try {
        responseData = await response.json()
      } catch (e) {
        console.error('Ошибка при парсинге ответа:', e)
        throw new Error('Ошибка при обработке ответа сервера')
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || 'Ошибка при сохранении QR-кода'
        throw new Error(errorMessage)
      }

      return responseData
    } catch (error) {
      console.error('Ошибка при сохранении QR-кода:', error)
      throw error
    }
  }

  const getQRCodes = async () => {
    try {
      const response = await fetch(`${baseURL}/qr/list`, {
        headers,
        credentials: 'include'
      })

      let responseData
      try {
        responseData = await response.json()
      } catch (e) {
        console.error('Ошибка при парсинге ответа:', e)
        throw new Error('Ошибка при обработке ответа сервера')
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || 'Ошибка при получении QR-кодов'
        throw new Error(errorMessage)
      }

      return responseData
    } catch (error) {
      console.error('Ошибка при получении QR-кодов:', error)
      throw error
    }
  }

  return {
    post,
    saveQRCode,
    getQRCodes
  }
} 