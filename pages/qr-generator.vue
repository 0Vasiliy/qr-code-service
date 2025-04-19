<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Кнопка "Назад" -->
    <div class="mb-8">
      <button
        @click="navigateTo('/')"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {{ $t('qrGenerator.back') }}
      </button>
    </div>

    <div class="text-center mb-12">
      <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {{ $t('qrGenerator.title') }}
      </h1>
      <p class="mt-4 text-lg text-gray-500">
        {{ $t('qrGenerator.enterInfo') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Форма ввода -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ $t('qrGenerator.contactInfo') }}
        </h2>
        
        <form @submit.prevent="generateQR" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('qrGenerator.email') }}
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
              :class="{ 'border-red-500': errors.email }"
              placeholder="your@email.com"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('qrGenerator.phone') }}
            </label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div>
            <label for="social" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('qrGenerator.social') }}
            </label>
            <input
              type="text"
              id="social"
              v-model="formData.social"
              class="mt-1 block w-full rounded-md border border-gray-300/50 shadow-sm focus:border-gray-300 focus:ring-gray-300 focus:bg-gray-50 transition-colors duration-200"
              placeholder="https://t.me/username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('qrGenerator.design') }}
            </label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Цвет</label>
                <input
                  type="color"
                  v-model="qrOptions.color"
                  @input="updateQRCode"
                  class="w-full h-10 rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Размер</label>
                <input
                  type="range"
                  v-model.number="qrOptions.size"
                  min="100"
                  max="300"
                  step="10"
                  @input="updateQRCode"
                  class="w-full"
                />
                <span class="text-sm text-gray-600">{{ qrOptions.size }}px</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            {{ $t('qrGenerator.preview') }}
          </button>
        </form>
      </div>

      <!-- Предпросмотр и скачивание -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ $t('qrGenerator.preview') }}
        </h2>

        <div v-if="qrCode" class="flex flex-col items-center space-y-6">
          <div class="p-4 border border-gray-200 rounded-lg">
            <img :src="qrCode" :alt="qrData" class="max-w-full" :style="{ width: previewSize + 'px', height: previewSize + 'px' }" />
          </div>

          <div class="flex flex-wrap gap-4 justify-center">
            <button
              v-for="format in formats"
              :key="format"
              @click="downloadQR(format)"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {{ $t(`qrGenerator.formats.${format}`) }}
            </button>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 py-12">
          {{ $t('qrGenerator.enterInfo') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import QRCode from 'qrcode'
import { jsPDF } from 'jspdf'
import { useRoute } from 'vue-router'
import { qrService } from '~/services/api'
import type { QRCodeData } from '~/types'

const { t } = useI18n()

const formData = ref({
  email: '',
  phone: '',
  social: ''
})

const errors = ref({
  email: ''
})

const qrOptions = ref({
  color: '#000000',
  size: 200
})

const previewSize = ref(200)
const isPreviewMode = ref(false)
const savedQRId = ref<number | null>(null)

const formats = ['png', 'svg', 'pdf']

const qrData = computed(() => {
  const data = []
  if (formData.value.email) data.push(`Email: ${formData.value.email}`)
  if (formData.value.phone) data.push(`Phone: ${formData.value.phone}`)
  if (formData.value.social) data.push(`Social: ${formData.value.social}`)
  return data.join('\n')
})

const qrCode = ref('')

// Функция обновления QR-кода
const updateQRCode = async (size?: number) => {
  if (!qrData.value) return
  
  try {
    const options = {
      color: {
        dark: qrOptions.value.color,
        light: '#ffffff'
      },
      width: size || qrOptions.value.size,
      margin: 1
    }

    qrCode.value = await QRCode.toDataURL(qrData.value, options)
  } catch (error) {
    console.error('Error updating QR code:', error)
  }
}

// Наблюдатель за изменениями данных формы
watch([qrData, qrOptions], () => {
  if (qrData.value) {
    updateQRCode()
  }
}, { deep: true })

const generateQR = async () => {
  try {
    errors.value.email = ''
    if (!formData.value.email) {
      errors.value.email = 'Email is required'
      return
    }

    // Переключаем режим предпросмотра
    isPreviewMode.value = !isPreviewMode.value
    
    if (isPreviewMode.value) {
      // Увеличиваем размер для предпросмотра
      previewSize.value = Math.min(qrOptions.value.size * 1.5, 400)
    } else {
      // Возвращаем исходный размер
      previewSize.value = qrOptions.value.size
    }
    
    await updateQRCode(previewSize.value)

    // Сохраняем QR-код в API
    const qrData: QRCodeData = {
      email: formData.value.email,
      phone: formData.value.phone,
      social: formData.value.social,
      color: qrOptions.value.color,
      size: qrOptions.value.size,
      qrCode: qrCode.value
    }

    if (savedQRId.value) {
      // Обновляем существующий QR-код
      const response = await qrService.updateQRCode(savedQRId.value, qrData)
      if (!response.success) {
        console.error('Failed to update QR code:', response.error)
      }
    } else {
      // Создаем новый QR-код
      const response = await qrService.saveQRCode(qrData)
      if (response.success && response.data) {
        savedQRId.value = response.data.id
      } else {
        console.error('Failed to save QR code:', response.error)
      }
    }
  } catch (error) {
    console.error('Error generating QR code:', error)
  }
}

const downloadQR = async (format: string) => {
  if (!qrCode.value) return

  try {
    switch (format) {
      case 'png':
        const link = document.createElement('a')
        link.href = qrCode.value
        link.download = 'qr-code.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        break

      case 'svg':
        const svg = await QRCode.toString(qrData.value, {
          type: 'svg',
          color: {
            dark: qrOptions.value.color,
            light: '#ffffff'
          },
          width: qrOptions.value.size,
          margin: 1
        })
        const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
        const svgUrl = URL.createObjectURL(svgBlob)
        const svgLink = document.createElement('a')
        svgLink.href = svgUrl
        svgLink.download = 'qr-code.svg'
        document.body.appendChild(svgLink)
        svgLink.click()
        document.body.removeChild(svgLink)
        URL.revokeObjectURL(svgUrl)
        break

      case 'pdf':
        const pdf = new jsPDF()
        const imgData = qrCode.value
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const qrSize = Math.min(pdfWidth, pdfHeight) * 0.8
        const x = (pdfWidth - qrSize) / 2
        const y = (pdfHeight - qrSize) / 2
        pdf.addImage(imgData, 'PNG', x, y, qrSize, qrSize)
        pdf.save('qr-code.pdf')
        break
    }
  } catch (error) {
    console.error(`Error downloading QR code as ${format}:`, error)
  }
}

// Генерация QR-кода при загрузке страницы, если есть параметры
onMounted(async () => {
  const route = useRoute()
  if (route.query.trial && route.query.email) {
    formData.value.email = decodeURIComponent(route.query.email as string)
    await generateQR()
  }
})
</script> 