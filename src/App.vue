<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <NavBar />
    <main class="flex-1 w-full overflow-x-hidden">
      <div class="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
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
