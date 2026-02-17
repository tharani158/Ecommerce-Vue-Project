<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '../types/product'
import ProductCard from './ProductCard.vue'

const props = defineProps<{ products: Product[] }>()
</script>

<style scoped></style>
