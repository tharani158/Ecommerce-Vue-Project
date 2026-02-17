<template>
  <div @click="open" class="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white dark:bg-gray-800 h-full flex flex-col hover:-translate-y-1">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 sm:h-44 md:h-52 object-cover" />
    <div class="p-3 sm:p-4 flex flex-col flex-1">
      <h3 class="font-medium text-sm sm:text-base line-clamp-2 flex-1">{{ product.title }}</h3>
      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 line-clamp-1">{{ product.brand }}</p>
      <div class="mt-3 flex items-center justify-between gap-2">
        <div class="text-base sm:text-lg font-semibold text-brand-500">${{ product.price }}</div>
        <div class="text-xs sm:text-sm text-yellow-500 whitespace-nowrap">⭐ {{ product.rating }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '../types/product'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ product: Product }>()
const router = useRouter()

function open() {
  router.push({ name: 'ProductDetail', params: { id: String(props.product.id) } })
}
</script>

<style scoped></style>
