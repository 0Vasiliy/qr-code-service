<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">{{ $t('dashboard.title') }}</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">
            <div class="rounded-lg bg-white p-6 shadow">
              <h2 class="text-xl font-semibold text-gray-900">{{ $t('dashboard.welcome') }}, {{ userEmail }}</h2>
              <div class="mt-4">
                <button
                  @click="handleLogout"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {{ $t('dashboard.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')

onMounted(() => {
  // Проверяем авторизацию
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const email = localStorage.getItem('userEmail')
  
  if (!isAuthenticated || !email) {
    router.push('/auth')
    return
  }
  
  userEmail.value = email
})

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userEmail')
  router.push('/')
}
</script> 