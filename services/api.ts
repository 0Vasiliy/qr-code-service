import type { QRCodeData } from '~/types'

// Базовый URL для JSONPlaceholder
const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Интерфейс для ответа API
interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

// Сервис для работы с QR-кодами
export const qrService = {
  // Сохранение данных QR-кода
  async saveQRCode(data: QRCodeData): Promise<ApiResponse> {
    try {
      // В реальном приложении здесь будет запрос к вашему API
      // Для тестирования используем JSONPlaceholder
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'QR Code Data',
          body: JSON.stringify(data),
          userId: 1,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save QR code data')
      }

      const result = await response.json()
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      console.error('Error saving QR code:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },

  // Получение данных QR-кода
  async getQRCode(id: number): Promise<ApiResponse> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch QR code data')
      }

      const result = await response.json()
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      console.error('Error fetching QR code:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },

  // Обновление данных QR-кода
  async updateQRCode(id: number, data: QRCodeData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'QR Code Data',
          body: JSON.stringify(data),
          userId: 1,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update QR code data')
      }

      const result = await response.json()
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      console.error('Error updating QR code:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },

  // Удаление QR-кода
  async deleteQRCode(id: number): Promise<ApiResponse> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete QR code data')
      }

      return {
        success: true,
      }
    } catch (error) {
      console.error('Error deleting QR code:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },
} 