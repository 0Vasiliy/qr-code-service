<template>
  <div class="min-h-screen bg-gray-50">
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
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ $t('dashboard.emailVerified') }}
                </span>
              </div>
            </div>

            <!-- Кнопка выхода -->
            <button
              @click="logout"
              class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {{ $t('dashboard.logout') }}
            </button>
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
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()
const user = ref(authStore.user)

const logout = async () => {
  try {
    await authStore.logout()
    navigateTo('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

onMounted(() => {
  // Проверить, авторизован ли пользователь
  if (!authStore.checkAuth()) {
    navigateTo('/auth')
  }
})
</script> 