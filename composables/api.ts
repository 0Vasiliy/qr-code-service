import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

// Для локальной разработки (master branch):
// const baseURL = 'http://localhost:3000/api'

// Для продакшена (gh-pages branch):
const baseURL = 'https://vladimir-zhukov.github.io/qr-code-service/api'

export const useApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const authStore = useAuthStore()
  const token = ref(authStore.token)

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token.value ? { 'Authorization': `Bearer ${token.value}` } : {})
  }

  const post = async (endpoint: string, data: any) => {
    loading.value = true
    error.value = null

    try {
      console.log('Отправка запроса:', { endpoint, data })
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })

      console.log('Получен ответ:', response)

      // Проверяем тип ответа
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Неверный формат ответа сервера')
      }

      const responseData = await response.json()
      console.log('Данные ответа:', responseData)

      if (!response.ok) {
        throw new Error(responseData.message || 'Ошибка сервера')
      }

      if (responseData.status === 'error') {
        throw new Error(responseData.message || 'Ошибка при обработке запроса')
      }

      return responseData
    } catch (err: any) {
      console.error('Ошибка API:', err)
      error.value = err.message || 'Ошибка при обработке ответа сервера'
      throw err
    } finally {
      loading.value = false
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
    getQRCodes,
    loading,
    error
  }
} 