<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <NavBar @toggle-cart="isCartOpen = !isCartOpen" />
    <main class="flex-1 w-full overflow-x-hidden">
      <div class="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <router-view />
      </div>
    </main>
    <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import CartDrawer from './components/CartDrawer.vue'

const isCartOpen = ref(false)
</script>

<style>
</style>
