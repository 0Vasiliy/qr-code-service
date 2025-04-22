<template>
  <div class="min-h-screen bg-emerald-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
        <div class="header flex flex-col sml:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-0 sm:mb-0 md:mb-5">
            {{ $t('home.title') }}
          </h1>
          <div class="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 mt-0 sm:mt-0 md:mt-5">
          
            <button 
              @click="setLocale('ru')"
              :class="{ 'text-teal-600': locale === 'ru' }"
              class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:text-teal-600 transition-colors"
            >
              RU
            </button>
            <button 
              @click="setLocale('en')"
              :class="{ 'text-teal-600': locale === 'en' }"
              class="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:text-teal-600 transition-colors"
            >
              EN
            </button>
            <button 
              @click="isOpen = true"
              class="ml-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
            >
              {{ $t('feedback.title') }}
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
    <!-- Форма обратной связи -->
    <FeedbackForm v-model:isOpen="isOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { locale, setLocale } = useI18n()
const isOpen = ref(false)
</script> 
