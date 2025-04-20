import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
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
    baseUrl: 'https://0vasiliy.github.io/qr-code-service/',
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
    ssr: false,
    // baseURL: '/qr-code-service/',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: 'QR Code Service - Поиск утерянных вещей',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Сервис для создания и управления QR-кодами для поиска утерянных вещей' },
        { 'http-equiv': 'Content-Security-Policy', content: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:;" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/qr-code-service/favicon.ico' }
      ]
    }
  },

  compatibilityDate: '2025-04-17'
})