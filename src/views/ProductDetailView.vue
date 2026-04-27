<template>
  <section v-if="loading" class="text-sm text-gray-500">Loading product details...</section>
  <section v-else-if="error" class="text-sm text-red-500">{{ error }}</section>
  <section v-else-if="product">
    <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
      <div class="flex items-center justify-center">
        <img :src="product.thumbnail" :alt="product.title" class="h-64 w-full rounded-lg object-cover shadow-md sm:h-80 md:h-96" />
      </div>
      <div class="flex flex-col justify-start">
        <h1 class="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">{{ product.title }}</h1>
        <p class="mt-2 text-sm text-gray-500 sm:text-base dark:text-gray-300">{{ product.brand ?? 'Generic' }} • {{ product.category }}</p>
        <div class="mt-4 border-y py-3 text-2xl font-bold text-brand-500 sm:text-3xl">${{ product.price.toFixed(2) }}</div>
        <p class="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-200">{{ product.description }}</p>
        <div class="mt-6 sm:mt-8 flex gap-3">
          <button
            type="button"
            class="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:px-6 sm:py-3 sm:text-base"
            @click="add"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="text-sm text-gray-500">Product not found.</section>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types/product'

const route = useRoute()
const { fetchProductById } = useProducts()
const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const cart = useCartStore()

async function loadProduct() {
  loading.value = true
  error.value = null
  const id = Number(route.params.id)
  if (Number.isNaN(id)) {
    product.value = null
    loading.value = false
    error.value = 'Invalid product id.'
    return
  }
  try {
    product.value = await fetchProductById(id)
  } catch (loadError) {
    product.value = null
    error.value = (loadError as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)

function add() {
  if (product.value) {
    cart.addToCart(product.value)
  }
}
</script>

<style scoped></style>
