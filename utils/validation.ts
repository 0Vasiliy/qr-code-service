/**
 * Утилиты для валидации данных
 * 
 * Этот файл содержит функции для проверки корректности введенных данных
 */

/**
 * Правила валидации поля
 * @interface ValidationRule
 * @property {boolean} [required] - Обязательное поле
 * @property {boolean} [email] - Проверка на email
 * @property {boolean} [phone] - Проверка на телефон
 * @property {number} [minLength] - Минимальная длина
 * @property {number} [maxLength] - Максимальная длина
 */
interface ValidationRule {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  minLength?: number;
  maxLength?: number;
}

/**
 * Результат валидации
 * @interface ValidationResult
 * @property {boolean} isValid - Флаг успешности валидации
 * @property {string[]} errors - Массив сообщений об ошибках
 */
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Валидация поля по заданным правилам
 * @param {string} value - Значение поля
 * @param {ValidationRule} rules - Правила валидации
 * @returns {ValidationResult} Результат валидации
 */
export const validateField = (value: string, rules: ValidationRule): ValidationResult => {
  const errors: string[] = [];

  // Проверка на обязательное поле
  if (rules.required && !value) {
    errors.push('Поле обязательно для заполнения');
  }

  // Проверка формата email
  if (rules.email && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push('Введите корректный email');
    }
  }

  // Проверка формата телефона
  if (rules.phone && value) {
    const phoneRegex = /^\+?[0-9\s-()]+$/;
    if (!phoneRegex.test(value)) {
      errors.push('Введите корректный номер телефона');
    }
  }

  // Проверка минимальной длины
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Минимальная длина: ${rules.minLength} символов`);
  }

  // Проверка максимальной длины
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Максимальная длина: ${rules.maxLength} символов`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 