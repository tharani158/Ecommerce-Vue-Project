<template>
  <div v-if="product">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img :src="product.thumbnail" class="w-full h-80 object-cover rounded" />
      <div>
        <h1 class="text-2xl font-semibold">{{ product.title }}</h1>
        <p class="text-gray-500 dark:text-gray-300">{{ product.brand }} • {{ product.category }}</p>
        <div class="mt-4 text-xl font-bold">${{ product.price }}</div>
        <p class="mt-4">{{ product.description }}</p>
        <div class="mt-6">
          <button @click="add" class="px-4 py-2 bg-brand-500 text-white rounded">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const id = Number(route.params.id)
const { fetchProductById } = useProducts()
const product = ref()
const cart = useCartStore()

onMounted(async () => {
  if (!Number.isNaN(id)) {
    // fetch by id
    const p = await fetchProductById(id)
    product.value = p
  }
})

function add() {
  if (product.value) cart.addToCart(product.value)
}
</script>

<style scoped></style>
