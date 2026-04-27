<template>
  <article class="flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 sm:h-44 md:h-52 object-cover" />
    <div class="p-3 sm:p-4 flex flex-col flex-1">
      <h3 class="font-medium text-sm sm:text-base line-clamp-2 flex-1">{{ product.title }}</h3>
      <p class="mt-1 line-clamp-1 text-xs text-gray-500 sm:text-sm dark:text-gray-300">{{ product.brand ?? 'Generic' }}</p>
      <div class="mt-3 flex items-center justify-between gap-2">
        <div class="text-base font-semibold text-brand-500 sm:text-lg">${{ product.price.toFixed(2) }}</div>
        <div class="text-xs sm:text-sm text-yellow-500 whitespace-nowrap">⭐ {{ product.rating }}</div>
      </div>
      <button
        type="button"
        class="mt-3 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
        @click="open"
      >
        View details
      </button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Product } from '../types/product'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()
const router = useRouter()

function open() {
  router.push({ name: 'ProductDetail', params: { id: String(props.product.id) } })
}
</script>

<style scoped></style>
