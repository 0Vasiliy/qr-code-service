<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-5 lg:mb-0">
        {{ $t('auth.login') }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
      <!-- Кнопка "Назад" -->
      <div class="absolute -top-12 left-0">
        <button
          @click="navigateTo('/')"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-sm transition-colors duration-200"
        >
          <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          {{ $t('auth.back') }}
        </button>
      </div>

      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Сообщение об ошибке -->
        <div v-if="error" class="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {{ error }}
        </div>

        <!-- Форма входа -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.email') }}
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.password') }}
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? $t('auth.loading') : $t('auth.login') }}
            </button>
          </div>
        </form>

        <!-- Тестовые учетные данные -->
        <div class="mt-6 text-center text-sm text-gray-500">
          <p>Тестовые учетные данные:</p>
          <p>Email: test@example.com</p>
          <p>Пароль: password</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()
const form = reactive({
  email: '',
  password: ''
})

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const handleSubmit = async () => {
  try {
    await authStore.login(form.email, form.password)
    navigateTo('/dashboard')
  } catch (err) {
    console.error('Auth error:', err)
  }
}
</script>

<style scoped>
@media (max-width: 849px) {
  .mb-5 {
    margin-bottom: 1.25rem;
  }
}
</style> 