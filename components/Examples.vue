<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('examples.title') }}</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">{{ $t('examples.description') }}</p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="example in examples" :key="example.id" class="flex flex-col items-start justify-between">
          <div class="relative w-full">
            <img :src="'/qr-code-service/images/examples/' + example.image" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div class="max-w-xl">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time :datetime="example.datetime" class="text-gray-500">{{ example.date }}</time>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a :href="example.href">
                  <span class="absolute inset-0" />
                  {{ $t(example.title) }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ $t(example.description) }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const examples = [
  {
    id: 1,
    title: 'examples.bag.title',
    description: 'examples.bag.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'bag.svg',
    href: '#'
  },
  {
    id: 2,
    title: 'examples.keys.title',
    description: 'examples.keys.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'keys.svg',
    href: '#'
  },
  {
    id: 3,
    title: 'examples.pet.title',
    description: 'examples.pet.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'pet.svg',
    href: '#'
  },
  {
    id: 4,
    title: 'examples.wallet.title',
    description: 'examples.wallet.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'wallet.svg',
    href: '#'
  },
  {
    id: 5,
    title: 'examples.luggage.title',
    description: 'examples.luggage.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'luggage.svg',
    href: '#'
  },
  {
    id: 6,
    title: 'examples.phone.title',
    description: 'examples.phone.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'phone.svg',
    href: '#'
  },
  {
    id: 7,
    title: 'examples.event.title',
    description: 'examples.event.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'event.svg',
    href: '#'
  },
  {
    id: 8,
    title: 'examples.restaurant.title',
    description: 'examples.restaurant.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'restaurant.svg',
    href: '#'
  },
  {
    id: 9,
    title: 'examples.business.title',
    description: 'examples.business.description',
    date: '2024-04-17',
    datetime: '2024-04-17',
    image: 'business.svg',
    href: '#'
  }
]
</script> 