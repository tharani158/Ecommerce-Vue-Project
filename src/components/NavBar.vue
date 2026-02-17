<template>
  <header class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <router-link to="/" class="text-2xl font-semibold text-brand-500">Store</router-link>
        <SearchBar @search="onSearch" />
      </div>
      <div class="flex items-center space-x-4">
        <DarkModeToggle />
        <router-link to="/login" v-if="!isLogged" class="text-sm px-3 py-1 bg-brand-500 text-white rounded">Login</router-link>
        <button v-else @click="logout" class="text-sm px-3 py-1 bg-red-500 text-white rounded">Logout</button>
        <button @click="toggleCart" class="relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4"></path></svg>
          <span v-if="count>0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{{ count }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import SearchBar from './SearchBar.vue'
import DarkModeToggle from './DarkModeToggle.vue'

const cart = useCartStore()
const auth = useAuthStore()

const count = computed(() => cart.totalItems())
const isLogged = computed(() => !!auth.user)

function toggleCart() {
  const ev = new CustomEvent('toggle-cart')
  window.dispatchEvent(ev)
}

function onSearch(term: string) {
  const ev = new CustomEvent('global-search', { detail: term })
  window.dispatchEvent(ev)
}

function logout() {
  auth.logout()
}
</script>

<style scoped>
</style>
