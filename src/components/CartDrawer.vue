<template>
  <div :class="['fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-l dark:border-gray-700 shadow-lg transform transition-transform', open ? 'translate-x-0' : 'translate-x-full']">
    <div class="p-4 flex items-center justify-between border-b dark:border-gray-700">
      <h3 class="font-semibold">Cart</h3>
      <button @click="close">Close</button>
    </div>
    <div class="p-4 overflow-auto h-[calc(100%-88px)]">
      <div v-if="items.length===0" class="text-sm text-gray-500">Your cart is empty</div>
      <div v-for="it in items" :key="it.product.id" class="flex items-center gap-3 py-3 border-b dark:border-gray-700">
        <img :src="it.product.thumbnail" class="w-16 h-16 object-cover" />
        <div class="flex-1">
          <div class="font-medium">{{ it.product.title }}</div>
          <div class="text-sm text-gray-500">${{ it.product.price }}</div>
          <div class="mt-2 flex items-center gap-2">
            <button @click="dec(it.product.id)" class="px-2">-</button>
            <div>{{ it.quantity }}</div>
            <button @click="inc(it.product.id)" class="px-2">+</button>
            <button @click="remove(it.product.id)" class="ml-auto text-sm text-red-500">Remove</button>
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
