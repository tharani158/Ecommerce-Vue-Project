<template>
  <div @click="open" class="border rounded overflow-hidden hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-800">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-44 object-cover" />
    <div class="p-3">
      <h3 class="font-medium">{{ product.title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-300">{{ product.brand }}</p>
      <div class="mt-2 flex items-center justify-between">
        <div class="text-lg font-semibold">${{ product.price }}</div>
        <div class="text-sm text-yellow-500">⭐ {{ product.rating }}</div>
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
