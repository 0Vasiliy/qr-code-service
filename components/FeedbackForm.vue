<!-- 
  Компонент FeedbackForm.vue
  Форма обратной связи с валидацией полей и обработкой отправки
-->
<template>
  <!-- Модальное окно -->
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Фон модального окна -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div 
          class="absolute inset-0 bg-gray-500 opacity-75 modal-backdrop"
          @click="handleClose"
        ></div>
      </div>

      <!-- Центрирование модального окна -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <!-- Содержимое модального окна -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal-content">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                {{ $t('feedback.title') }}
              </h3>
              
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">{{ $t('feedback.name') }}</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
                    :class="{ 'border-red-500': errors.name }"
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('feedback.email') }}</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
                    :class="{ 'border-red-500': errors.email }"
                  />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700">{{ $t('feedback.message') }}</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="4"
                    class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
                    :class="{ 'border-red-500': errors.message }"
                  ></textarea>
                  <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
                </div>

                <div class="mt-4">
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    :disabled="isSubmitting"
                  >
                    {{ isSubmitting ? $t('feedback.sending') : $t('feedback.submit') }}
                  </button>
                </div>

                <div v-if="isSuccess" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                  {{ $t('feedback.success') }}
                </div>

                <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                  {{ error }}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm close-button"
            @click="handleClose"
          >
            {{ $t('feedback.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

// Emits
const emit = defineEmits(['update:isOpen'])

// Состояние формы
const form = reactive({
  name: '',
  email: '',
  message: ''
})

// Ошибки валидации
const errors = reactive({
  name: '',
  email: '',
  message: ''
})

// Состояние отправки
const isSubmitting = ref(false)
const isSuccess = ref(false)
const error = ref('')

// Валидация email
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Валидация формы
const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('feedback.errors.nameRequired')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('feedback.errors.emailRequired')
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = t('feedback.errors.emailInvalid')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t('feedback.errors.messageRequired')
    isValid = false
  } else if (form.message.length < 10) {
    errors.message = t('feedback.errors.messageTooShort')
    isValid = false
  }

  return isValid
}

// Обработка отправки формы
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  error.value = ''
  isSuccess.value = false

  try {
    // Здесь будет логика отправки формы на сервер
    // Например, использование API или отправка email
    await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация задержки
    
    isSuccess.value = true
    // Очистка формы после успешной отправки
    form.name = ''
    form.email = ''
    form.message = ''
    
    // Закрытие модального окна через 2 секунды после успешной отправки
    setTimeout(() => {
      handleClose()
    }, 2000)
  } catch (err) {
    error.value = t('feedback.errors.submitFailed')
  } finally {
    isSubmitting.value = false
  }
}

// Обработчик закрытия модального окна
const handleClose = () => {
  const modalContent = document.querySelector('.modal-content')
  const modalBackdrop = document.querySelector('.modal-backdrop')
  
  if (modalContent && modalBackdrop) {
    modalContent.classList.add('closing')
    modalBackdrop.classList.add('closing')
    
    setTimeout(() => {
      emit('update:isOpen', false)
      modalContent.classList.remove('closing')
      modalBackdrop.classList.remove('closing')
    }, 300)
  } else {
    emit('update:isOpen', false)
  }
}

// Обработчик нажатия клавиши Escape
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

// Инициализация обработчиков событий при монтировании компонента
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

// Очистка обработчиков событий при размонтировании компонента
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Анимации для модального окна */
.modal-backdrop {
  transition: opacity 0.3s ease-in-out;
}

.modal-backdrop.closing {
  opacity: 0;
}

.modal-content {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0.95);
  opacity: 0;
}

.modal-content.closing {
  transform: scale(0.95);
  opacity: 0;
}

/* Анимация появления */
.modal-backdrop:not(.closing) {
  opacity: 0.75;
}

.modal-content:not(.closing) {
  transform: scale(1);
  opacity: 1;
}
</style> 