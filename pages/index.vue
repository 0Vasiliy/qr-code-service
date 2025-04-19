<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Информационный блок -->
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {{ $t('home.subtitle') }}
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          {{ $t('home.description') }}
        </p>
      </div>

      <!-- Форма быстрой регистрации -->
      <div class="mt-12 bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ $t('home.tryFree') }}
        </h3>
        <form @submit.prevent="generateTrialQR" class="space-y-4">
          <div>
            <label for="trial-email" class="block text-sm font-medium text-gray-700">
              {{ $t('home.email') }}
            </label>
            <input
              type="email"
              id="trial-email"
              v-model="trialEmail"
              required
              class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
            />
          </div>
          <button
            type="submit"
            class="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            {{ $t('home.generateTrial') }}
          </button>
        </form>
      </div>

      <!-- Как это работает -->
      <div class="mt-6">
        <h3 class="text-2xl font-bold text-center mb-8">
          {{ $t('home.howItWorks') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <div class="text-4xl font-bold text-teal-600 mb-4">{{ index + 1 }}</div>
            <p class="text-gray-600">{{ step }}</p>
          </div>
        </div>
      </div>

      <!-- Галерея примеров -->
      <ExamplesGallery class="mt-12"/>

      <!-- Кнопка создания QR-кода -->
      <div class="mt-12 text-center">
        <button
          @click="navigateTo('/qr-generator')"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
        >
          {{ $t('home.createQR') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const trialEmail = ref('')

const steps = computed(() => [
  t('home.steps.1'),
  t('home.steps.2'),
  t('home.steps.3')
])

const generateTrialQR = () => {
  navigateTo('/qr-generator?trial=true&email=' + encodeURIComponent(trialEmail.value))
}
</script> 
<style>
input:focus {
  border-color: #4CAF50 !important; 
  outline: none !important; 
}
</style>