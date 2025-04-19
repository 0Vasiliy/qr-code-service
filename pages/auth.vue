<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Кнопка "Назад" -->
    <div class="absolute top-4 left-4">
      <button
        @click="navigateTo('/')"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        {{ $t('auth.back') }}
      </button>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isLogin ? $t('auth.login') : $t('auth.register') }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Сообщение об ошибке -->
        <div v-if="error" class="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {{ error }}
        </div>

        <!-- Форма входа/регистрации -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div v-if="!isLogin">
            <label for="name" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.name') }}
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </div>

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

          <div v-if="!isLogin">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              {{ $t('auth.confirmPassword') }}
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? $t('auth.loading') : (isLogin ? $t('auth.login') : $t('auth.register')) }}
            </button>
          </div>
        </form>

        <!-- Разделитель -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                {{ $t('auth.orContinueWith') }}
              </span>
            </div>
          </div>

          <!-- Кнопки социальных сетей -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              @click="handleGoogleLogin"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="ml-2">{{ $t('auth.signInWithGoogle') }}</span>
            </button>

            <button
              @click="handleGithubLogin"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="ml-2">{{ $t('auth.signInWithGithub') }}</span>
            </button>
          </div>
        </div>

        <!-- Ссылка на смену режима -->
        <div class="mt-6 text-center">
          <button
            @click="toggleMode"
            class="text-sm text-teal-600 hover:text-teal-500"
          >
            {{ isLogin ? $t('auth.noAccount') : $t('auth.alreadyHaveAccount') }}
          </button>
        </div>

        <!-- Тестовые учетные данные -->
        <div class="mt-6 text-center text-sm text-gray-500">
          <p>Тестовые учетные данные:</p>
          <p>Email: test@example.com</p>
          <p>Пароль: test123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isLogin = ref(true)
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      await authStore.login(form.email, form.password)
    } else {
      if (form.password !== form.confirmPassword) {
        throw new Error('Passwords do not match')
      }
      await authStore.register(form.email, form.password, form.name)
    }
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Auth error:', error)
  }
}

const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle()
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Google login error:', error)
  }
}

const handleGithubLogin = async () => {
  try {
    await authStore.loginWithGithub()
    navigateTo('/dashboard')
  } catch (error) {
    console.error('GitHub login error:', error)
  }
}
</script> 