import { ref } from 'vue'

export const useApi = () => {
  const baseURL = '/api'
  const token = ref(localStorage.getItem('auth_token'))

  const headers = {
    'Content-Type': 'application/json',
    ...(token.value ? { 'Authorization': `Bearer ${token.value}` } : {})
  }

  const post = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ошибка запроса')
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const saveQRCode = async (data: any) => {
    try {
      const response = await fetch('/api/qr/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
          data,
          userId: authStore.user?.id
        })
      })

      if (!response.ok) {
        throw new Error('Ошибка при сохранении QR-кода')
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving QR code:', error)
      throw error
    }
  }

  const getQRCodes = async () => {
    try {
      const response = await fetch('/api/qr/list', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })

      if (!response.ok) {
        throw new Error('Ошибка при получении QR-кодов')
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting QR codes:', error)
      throw error
    }
  }

  return {
    post,
    saveQRCode,
    getQRCodes
  }
} 