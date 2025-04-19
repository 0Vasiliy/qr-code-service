<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Кнопка "Назад" -->
    <button
      @click="navigateTo('/')"
      class="fixed top-4 left-4 z-50 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ $t('qrGenerator.back') }}
    </button>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Заголовок -->
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900">{{ $t('dashboard.title') }}</h1>
        <p class="mt-1 text-sm text-gray-500">{{ $t('dashboard.welcome') }}, {{ user?.name }}</p>
      </div>

      <!-- Основной контент -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Левая колонка - Профиль -->
        <div class="lg:col-span-1">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">{{ $t('dashboard.profile') }}</h2>
            
            <!-- Статус email -->
            <div class="mb-4">
              <p class="text-sm text-gray-500">{{ user?.email }}</p>
              <div class="mt-2">
                <span v-if="user?.emailVerified" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ $t('dashboard.emailVerified') }}
                </span>
                <div v-else class="flex items-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {{ $t('dashboard.emailNotVerified') }}
                  </span>
                  <button 
                    @click="sendVerificationEmail"
                    class="ml-2 text-sm text-teal-600 hover:text-teal-500"
                  >
                    {{ $t('dashboard.verifyEmail') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Подключенные аккаунты -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">{{ $t('dashboard.connectedAccounts') }}</h3>
              <div class="mt-2 space-y-3">
                <!-- Google -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span class="ml-2 text-sm text-gray-900">Google</span>
                  </div>
                  <div v-if="user?.googleConnected">
                    <span class="text-sm text-green-600">{{ $t('dashboard.connected') }}</span>
                    <button @click="disconnectGoogle" class="ml-2 text-sm text-red-600 hover:text-red-500">
                      {{ $t('dashboard.disconnect') }}
                    </button>
                  </div>
                  <button v-else @click="connectGoogle" class="text-sm text-teal-600 hover:text-teal-500">
                    {{ $t('dashboard.connectGoogle') }}
                  </button>
                </div>

                <!-- GitHub -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span class="ml-2 text-sm text-gray-900">GitHub</span>
                  </div>
                  <div v-if="user?.githubConnected">
                    <span class="text-sm text-green-600">{{ $t('dashboard.connected') }}</span>
                    <button @click="disconnectGithub" class="ml-2 text-sm text-red-600 hover:text-red-500">
                      {{ $t('dashboard.disconnect') }}
                    </button>
                  </div>
                  <button v-else @click="connectGithub" class="text-sm text-teal-600 hover:text-teal-500">
                    {{ $t('dashboard.connectGithub') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая колонка - QR-коды и статистика -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">{{ $t('dashboard.qrCodes') }}</h2>
            <!-- Здесь будет список QR-кодов пользователя -->
            <div class="text-center text-gray-500">
              {{ $t('dashboard.noQRCodes') }}
            </div>
          </div>

          <div class="mt-6 bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">{{ $t('dashboard.statistics') }}</h2>
            <!-- Здесь будет статистика -->
            <div class="text-center text-gray-500">
              {{ $t('dashboard.noStatistics') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const user = ref(authStore.user)

const sendVerificationEmail = async () => {
  try {
    await authStore.sendVerificationEmail()
    // Показать уведомление об успешной отправке
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}

const connectGoogle = async () => {
  try {
    await authStore.connectGoogle()
    // Обновить данные пользователя
    user.value = authStore.user
  } catch (error) {
    console.error('Error connecting Google:', error)
  }
}

const disconnectGoogle = async () => {
  try {
    await authStore.disconnectGoogle()
    // Обновить данные пользователя
    user.value = authStore.user
  } catch (error) {
    console.error('Error disconnecting Google:', error)
  }
}

const connectGithub = async () => {
  try {
    await authStore.connectGithub()
    // Обновить данные пользователя
    user.value = authStore.user
  } catch (error) {
    console.error('Error connecting GitHub:', error)
  }
}

const disconnectGithub = async () => {
  try {
    await authStore.disconnectGithub()
    // Обновить данные пользователя
    user.value = authStore.user
  } catch (error) {
    console.error('Error disconnecting GitHub:', error)
  }
}

onMounted(() => {
  // Проверить, авторизован ли пользователь
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
})
</script> 