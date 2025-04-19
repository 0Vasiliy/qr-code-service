import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  base: '/qr-code-service/',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  nitro: {
    output: {
      dir: '.output',
      serverDir: '.output/server',
      publicDir: '.output/public'
    },
    devProxy: {},
    devStorage: {}
  },

  i18n: {
    baseUrl: 'http://localhost:3000',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        file: 'ru.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'ru',
    langDir: 'i18n/locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  app: {
    head: {
      title: 'QR Code Service - Поиск утерянных вещей',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Сервис для создания и управления QR-кодами для поиска утерянных вещей' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  compatibilityDate: '2025-04-17'
})