<!-- 
  Компонент SchemaOrg.vue
  Предоставляет микроразметку Schema.org для SEO
-->
<template>
  <div>
    <!-- Микроразметка будет добавлена через useHead -->
  </div>
</template>

<script setup lang="ts">
// Определяем метаданные для микроразметки
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'QR Code Generator',
  'description': 'Сервис для генерации и управления QR-кодами с современным интерфейсом и адаптивным дизайном',
  'url': 'https://your-domain.com',
  'applicationCategory': 'Utility',
  'operatingSystem': 'Web',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'RUB'
  },
  'creator': {
    '@type': 'Organization',
    'name': 'Your Company Name',
    'url': 'https://your-domain.com'
  }
}

// Добавляем микроразметку через useHead
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(schemaOrg)
    }
  ]
})
</script> 