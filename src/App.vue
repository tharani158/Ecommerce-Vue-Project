<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1 container mx-auto px-4 py-6">
      <router-view />
    </main>
    <CartDrawer />
  </div>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
import CartDrawer from './components/CartDrawer.vue'
</script>

<style>
</style>
