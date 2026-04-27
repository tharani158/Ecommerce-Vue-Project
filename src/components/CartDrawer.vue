<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <button class="absolute inset-0 bg-black/50" aria-label="Close cart drawer" @click="emit('close')" />

    <aside
      class="absolute right-0 top-0 h-full w-full border-l bg-white shadow-lg transition-transform duration-300 sm:w-96 md:w-80 dark:border-gray-700 dark:bg-gray-800"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div class="flex items-center justify-between border-b p-3 sm:p-4 dark:border-gray-700">
        <h3 class="text-lg font-semibold sm:text-xl">Cart</h3>
        <button type="button" class="text-2xl hover:text-gray-600" aria-label="Close cart" @click="emit('close')">×</button>
      </div>

      <div class="h-[calc(100%-140px)] overflow-auto p-3 sm:h-[calc(100%-156px)] sm:p-4">
        <div v-if="items.length === 0" class="text-sm text-gray-500">Your cart is empty</div>
        <div v-for="it in items" :key="it.product.id" class="flex items-start gap-2 border-b py-3 sm:gap-3 dark:border-gray-700">
          <img :src="it.product.thumbnail" :alt="it.product.title" class="h-14 w-14 flex-shrink-0 rounded object-cover sm:h-16 sm:w-16" />
          <div class="min-w-0 flex-1">
            <div class="line-clamp-2 text-sm font-medium sm:text-base">{{ it.product.title }}</div>
            <div class="mt-1 text-xs text-gray-500 sm:text-sm">${{ it.product.price.toFixed(2) }}</div>
            <div class="mt-2 flex flex-wrap items-center gap-1 sm:gap-2">
              <button type="button" class="rounded border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" :aria-label="`Decrease quantity for ${it.product.title}`" @click="dec(it.product.id)">−</button>
              <div class="w-6 text-center text-sm">{{ it.quantity }}</div>
              <button type="button" class="rounded border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" :aria-label="`Increase quantity for ${it.product.title}`" @click="inc(it.product.id)">+</button>
              <button type="button" class="ml-auto text-xs text-red-500 hover:text-red-700 sm:text-sm" :aria-label="`Remove ${it.product.title} from cart`" @click="remove(it.product.id)">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t p-3 sm:p-4 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-200">
          Subtotal:
          <span class="font-semibold text-gray-900 dark:text-white">${{ cartSubtotal.toFixed(2) }}</span>
        </p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const cart = useCartStore()

function inc(id: number) {
  const item = cart.items.find((cartItem) => cartItem.product.id === id)
  if (item) {
    cart.updateQuantity(id, item.quantity + 1)
  }
}

function dec(id: number) {
  const item = cart.items.find((cartItem) => cartItem.product.id === id)
  if (item) {
    cart.updateQuantity(id, Math.max(1, item.quantity - 1))
  }
}

function remove(id: number) {
  cart.removeFromCart(id)
}

const items = computed(() => cart.items)
const isOpen = computed(() => props.isOpen)
const cartSubtotal = computed(() =>
  items.value.reduce((runningTotal, item) => runningTotal + item.product.price * item.quantity, 0)
)
</script>

<style scoped></style>
