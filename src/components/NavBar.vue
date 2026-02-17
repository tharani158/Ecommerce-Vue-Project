<template>
  <header class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40">
    <div class="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">

      <!-- Logo -->
      <router-link 
        to="/" 
        class="text-xl sm:text-2xl font-semibold text-brand-500 flex-shrink-0">
        Store
      </router-link>

      <!-- Desktop Search -->
      <div class="hidden md:block w-1/3">
        <SearchBar @search="onSearch" />
      </div>

      <!-- Desktop Right Section -->
      <div class="hidden md:flex items-center space-x-3 lg:space-x-4">
        <DarkModeToggle />

        <router-link 
          to="/login" 
          v-if="!isLogged" 
          class="text-xs lg:text-sm px-3 py-1.5 bg-brand-500 text-white rounded-lg hover:bg-blue-700 transition">
          Login
        </router-link>

        <button 
          v-else 
          @click="logout" 
          class="text-xs lg:text-sm px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-700 transition">
          Logout
        </button>

        <!-- Cart -->
        <button @click="toggleCart" class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4"></path>
          </svg>

          <span 
            v-if="count>0"
            class="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {{ count }}
          </span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
        <svg @click="isOpen = !isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Search -->
    <div class="md:hidden px-3 sm:px-4 pb-3">
      <SearchBar @search="onSearch" />
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden px-3 sm:px-4 pb-4 space-y-2 border-t dark:border-gray-700">

      <DarkModeToggle />

      <router-link 
        to="/login" 
        v-if="!isLogged"
        class="block text-sm px-3 py-2 bg-brand-500 text-white rounded-lg hover:bg-blue-700 transition text-center">
        Login
      </router-link>

      <button 
        v-else
        @click="logout"
        class="block w-full text-left text-sm px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition">
        Logout
      </button>

      <button 
        @click="toggleCart"
        class="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
        <span class="text-sm">Cart</span>
        <span 
          v-if="count>0"
          class="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
          {{ count }}
        </span>
      </button>

    </div>
  </header>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import SearchBar from './SearchBar.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { ref } from 'vue'

const cart = useCartStore()
const auth = useAuthStore()
const isOpen = ref(false)

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
