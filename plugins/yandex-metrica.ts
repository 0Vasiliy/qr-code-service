import { defineNuxtPlugin } from '#app'
import type { NuxtApp } from 'nuxt/app'

declare global {
  interface Window {
    ym: (counterId: string | number, method: string, ...args: any[]) => void
  }
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const config = useRuntimeConfig()
  const counterId = config.public.yandexMetricaId as string | number

  if (!counterId) {
    console.warn('Yandex.Metrica counter ID is not configured')
    return
  }

  // Инициализация Yandex.Metrica
  const initYandexMetrica = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${counterId}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `
    document.head.appendChild(script)
  }

  // Отслеживание просмотра страницы
  const trackPageView = (url: string) => {
    if (window.ym) {
      window.ym(counterId, 'hit', url)
    }
  }

  // Отслеживание события
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    if (window.ym) {
      window.ym(counterId, 'reachGoal', action, {
        category,
        label,
        value
      })
    }
  }

  // Инициализация на клиентской стороне
  if (process.client) {
    initYandexMetrica()
  }

  return {
    provide: {
      yandexMetrica: {
        trackPageView,
        trackEvent
      }
    }
  }
}) 