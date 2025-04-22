import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  nitro: {
    preset: 'static',
    output: {
      dir: '.output',
      publicDir: '.output/public'
    },
    prerender: {
      routes: ['/', '/qr-generator'],
      crawlLinks: true
    }
  },

  i18n: {
    baseUrl: process.env.NODE_ENV === 'production' ? '/qr-code-service/' : '/',
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
    baseURL: process.env.NODE_ENV === 'production' ? '/qr-code-service/' : '/',
    buildAssetsDir: 'assets/',
    head: {
      title: 'QR Code Service',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Сервис для создания QR кодов' },
        { 
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:3001 https:;"
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  ssr: true,

  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : '/api',
      baseURL: process.env.NODE_ENV === 'production' ? '/qr-code-service/' : '/',
      imagesPath: process.env.NODE_ENV === 'production' ? '/qr-code-service/images/' : '/images/'
    }
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name) {
              if (/\.(gif|jpe?g|png|svg)$/.test(assetInfo.name)) {
                return `images/[name][extname]`
              }
              if (/\.css$/.test(assetInfo.name)) {
                return `css/[name][extname]`
              }
              if (/\.js$/.test(assetInfo.name)) {
                return `js/[name][extname]`
              }
            }
            return `assets/[name][extname]`
          }
        }
      }
    }
  },

  compatibilityDate: '2025-04-22',

  hooks: {
    'nitro:config': (config) => {
      if (config.prerender) {
        config.prerender.routes = config.prerender.routes || []
        config.prerender.routes.push('/en', '/en/qr-generator')
      }
    }
  }
})