<template>
  <section v-if="products.length > 0" class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </section>
  <p v-else class="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500 dark:border-gray-700">
    No products match your filters.
  </p>
</template>

<script lang="ts" setup>
import type { Product } from '../types/product'
import ProductCard from './ProductCard.vue'

defineProps<{ products: Product[] }>()
</script>

<style scoped></style>
