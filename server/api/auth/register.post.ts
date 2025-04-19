import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, name } = body

    // TODO: Здесь будет реальная регистрация пользователя
    // Пока используем временную логику
    if (email && password && name) {
      return {
        success: true,
        user: {
          id: 1,
          email: email,
          name: name
        }
      }
    }

    return {
      success: false,
      error: 'Не все обязательные поля заполнены'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Произошла ошибка при регистрации'
    }
  }
}) 