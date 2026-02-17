<template>
  <div :class="['fixed right-0 top-0 h-full w-full sm:w-96 md:w-80 bg-white dark:bg-gray-800 border-l dark:border-gray-700 shadow-lg transform transition-transform duration-300 z-50', open ? 'translate-x-0' : 'translate-x-full']">
    <div class="p-3 sm:p-4 flex items-center justify-between border-b dark:border-gray-700">
      <h3 class="font-semibold text-lg sm:text-xl">Cart</h3>
      <button @click="close" class="text-2xl hover:text-gray-600">×</button>
    </div>
    <div class="p-3 sm:p-4 overflow-auto h-[calc(100%-70px)] sm:h-[calc(100%-88px)]">
      <div v-if="items.length===0" class="text-sm text-gray-500">Your cart is empty</div>
      <div v-for="it in items" :key="it.product.id" class="flex items-start gap-2 sm:gap-3 py-3 border-b dark:border-gray-700">
        <img :src="it.product.thumbnail" class="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm sm:text-base line-clamp-2">{{ it.product.title }}</div>
          <div class="text-xs sm:text-sm text-gray-500 mt-1">${{ it.product.price }}</div>
          <div class="mt-2 flex items-center gap-1 sm:gap-2 flex-wrap">
            <button @click="dec(it.product.id)" class="px-2 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">−</button>
            <div class="w-6 text-center text-sm">{{ it.quantity }}</div>
            <button @click="inc(it.product.id)" class="px-2 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
            <button @click="remove(it.product.id)" class="ml-auto text-xs sm:text-sm text-red-500 hover:text-red-700">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const open = ref(false)
const cart = useCartStore()

function onToggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function inc(id: number) {
  const it = cart.items.find(i => i.product.id === id)
  if (it) cart.updateQuantity(id, it.quantity + 1)
}

function dec(id: number) {
  const it = cart.items.find(i => i.product.id === id)
  if (it) cart.updateQuantity(id, Math.max(1, it.quantity - 1))
}

function remove(id: number) {
  cart.removeFromCart(id)
}

onMounted(() => {
  window.addEventListener('toggle-cart', onToggle)
})
onUnmounted(() => {
  window.removeEventListener('toggle-cart', onToggle)
})

const items = computed(() => cart.items)

</script>

<style scoped></style>
