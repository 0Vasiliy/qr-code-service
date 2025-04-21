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
    // Для локальной разработки (master branch):
    // preset: 'node-server',
    // Для продакшена (gh-pages branch):
    preset: 'github-pages',
    prerender: {
      routes: ['/', '/auth', '/dashboard']
    },
    devProxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        prependPath: true,
        ws: true
      }
    },
    devStorage: {},
    timing: false,
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  },

  i18n: {
    // Для локальной разработки (master branch):
    // baseUrl: '/',
    // Для продакшена (gh-pages branch):
    baseUrl: '/qr-code-service/',
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
    // Для локальной разработки (master branch):
    // baseURL: '/',
    // Для продакшена (gh-pages branch):
    baseURL: '/qr-code-service/',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: 'QR Code Service',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Сервис для создания QR кодов' },
        { 
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:3001;"
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/qr-code-service/favicon.ico' }
      ]
    }
  },
  target: 'static',
  ssr: true,
  compatibilityDate: '2025-04-17',
  
  // Отключаем кэширование в режиме разработки
  devServer: {
    watch: {
      usePolling: true
    }
  },

  // Настройки маршрутизации
  router: {
    options: {
      strict: false
    }
  },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true
        }
      }
    }
  },

  // Для локальной разработки (master branch):
  // server: {
  //   port: 3000,
  //   host: '0.0.0.0'
  // }
})