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

onMounted(() => {
  // Проверить, авторизован ли пользователь
  if (!authStore.isAuthenticated) {
    navigateTo('/auth/login')
  }
})
</script> 