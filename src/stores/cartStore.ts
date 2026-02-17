import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CartItem, Product } from '../types/product'

const CART_KEY = 'ecom_cart_v1'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  function load() {
    const raw = localStorage.getItem(CART_KEY)
    if (raw) {
      try {
        items.value = JSON.parse(raw) as CartItem[]
      } catch {
        items.value = []
      }
    }
  }

  function persist() {
    localStorage.setItem(CART_KEY, JSON.stringify(items.value))
  }

  function addToCart(product: Product, qty = 1) {
    const idx = items.value.findIndex(i => i.product.id === product.id)
    if (idx >= 0) {
      items.value[idx].quantity += qty
    } else {
      items.value.push({ product, quantity: qty })
    }
    persist()
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(i => i.product.id !== productId)
    persist()
  }

  function updateQuantity(productId: number, quantity: number) {
    const it = items.value.find(i => i.product.id === productId)
    if (it) {
      it.quantity = Math.max(1, quantity)
      persist()
    }
  }

  function clearCart() {
    items.value = []
    persist()
  }

  function totalItems() {
    return items.value.reduce((s, i) => s + i.quantity, 0)
  }

  load()

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }
})
