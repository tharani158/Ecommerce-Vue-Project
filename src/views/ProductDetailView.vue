<template>
  <div v-if="product">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      <div class="flex items-center justify-center">
        <img :src="product.thumbnail" class="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md" />
      </div>
      <div class="flex flex-col justify-start">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">{{ product.title }}</h1>
        <p class="text-gray-500 dark:text-gray-300 text-sm sm:text-base mt-2">{{ product.brand }} • {{ product.category }}</p>
        <div class="mt-4 text-2xl sm:text-3xl font-bold text-brand-500 py-3 border-y">${{ product.price }}</div>
        <p class="mt-4 text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed">{{ product.description }}</p>
        <div class="mt-6 sm:mt-8 flex gap-3">
          <button @click="add" class="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const { fetchProductById } = useProducts()
const product = ref()
const cart = useCartStore()

async function loadProduct() {
  const id = Number(route.params.id)
  if (Number.isNaN(id)) {
    product.value = undefined
    return
  }
  product.value = undefined
  product.value = await fetchProductById(id)
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)

function add() {
  if (product.value) cart.addToCart(product.value)
}
</script>

<style scoped></style>
