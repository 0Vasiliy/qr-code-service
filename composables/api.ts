import { ref } from 'vue'

export const useApi = () => {
  const isDev = process.env.NODE_ENV === 'development'
  const baseURL = isDev 
    ? 'http://localhost:3000/api'
    : '/api'

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const post = async (endpoint: string, data: any) => {
    try {
      console.log('Отправка POST запроса:', {
        url: `${baseURL}${endpoint}`,
        data
      })

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
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Ошибка при сохранении QR-кода')
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка при сохранении QR-кода:', error)
      throw error
    }
  }

  const getQRCodes = async () => {
    try {
      const response = await fetch(`${baseURL}/qr/list`, {
        method: 'GET',
        headers,
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Ошибка при получении списка QR-кодов')
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка при получении списка QR-кодов:', error)
      throw error
    }
  }

  return {
    post,
    saveQRCode,
    getQRCodes
  }
} 