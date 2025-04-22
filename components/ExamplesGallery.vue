<!-- 
  Компонент ExamplesGallery.vue
  Отображает галерею примеров использования QR-кодов
-->
<template>
  <div class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {{ $t('examples.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          {{ $t('examples.description') }}
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(example, index) in examples" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <img :src="`${config.public.imagesPath}examples/${example.image}`" :alt="example.title" class="w-full h-auto" />
            <h3 class="mt-4 text-xl font-semibold text-gray-900">{{ example.title }}</h3>
            <p class="mt-2 text-gray-500">{{ example.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig } from '#app'

const { t } = useI18n()
const config = useRuntimeConfig()

const examples = computed(() => [
  {
    image: 'bag.svg',
    title: t('examples.bag.title'),
    description: t('examples.bag.description')
  },
  {
    image: 'keys.svg',
    title: t('examples.keys.title'),
    description: t('examples.keys.description')
  },
  {
    image: 'pet.svg',
    title: t('examples.pet.title'),
    description: t('examples.pet.description')
  },
  {
    image: 'wallet.svg',
    title: t('examples.wallet.title'),
    description: t('examples.wallet.description')
  },
  {
    image: 'luggage.svg',
    title: t('examples.luggage.title'),
    description: t('examples.luggage.description')
  },
  {
    image: 'phone.svg',
    title: t('examples.phone.title'),
    description: t('examples.phone.description')
  },
  {
    image: 'event.svg',
    title: t('examples.event.title'),
    description: t('examples.event.description')
  },
  {
    image: 'restaurant.svg',
    title: t('examples.restaurant.title'),
    description: t('examples.restaurant.description')
  },
  {
    image: 'business.svg',
    title: t('examples.business.title'),
    description: t('examples.business.description')
  }
])
</script> 