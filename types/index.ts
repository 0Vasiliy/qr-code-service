/**
 * Типы данных для QR-кодов
 * 
 * Этот файл содержит интерфейсы для работы с QR-кодами
 */

/**
 * Данные QR-кода
 * @interface QRCodeData
 * @property {string} email - Email пользователя
 * @property {string} [phone] - Номер телефона (опционально)
 * @property {string} [social] - Ссылка на социальные сети (опционально)
 * @property {string} color - Цвет QR-кода
 * @property {number} size - Размер QR-кода
 * @property {string} qrCode - Сгенерированный QR-код в формате base64
 */
export interface QRCodeData {
  email: string
  phone?: string
  social?: string
  color: string
  size: number
  qrCode: string
}

/**
 * Настройки QR-кода
 * @interface QRCodeOptions
 * @property {string} color - Цвет QR-кода
 * @property {number} size - Размер QR-кода
 */
export interface QRCodeOptions {
  color: string
  size: number
} 