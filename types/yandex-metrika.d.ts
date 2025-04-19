/**
 * Типы для Яндекс.Метрики
 * 
 * Определение интерфейса для работы с API Яндекс.Метрики
 */

/**
 * Расширение глобального интерфейса Window для поддержки Яндекс.Метрики
 * @interface Window
 * @property {Function} ym - Функция для вызова методов Яндекс.Метрики
 * @param {number|string} counterId - ID счетчика Яндекс.Метрики
 * @param {string} method - Название метода
 * @param {...any} args - Аргументы метода
 */
declare interface Window {
  ym: (counterId: number | string, method: string, ...args: any[]) => void;
} 