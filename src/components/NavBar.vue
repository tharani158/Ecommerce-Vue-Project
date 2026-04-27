<template>
  <header class="sticky top-0 z-40 border-b bg-white dark:border-gray-700 dark:bg-gray-800">
    <div class="container mx-auto flex items-center justify-between px-3 py-3 sm:px-4">
      <router-link to="/" class="text-xl font-semibold text-brand-500 sm:text-2xl">
        ROVER DIGITAL STORE
      </router-link>

      <div class="hidden items-center space-x-3 md:flex">
        <DarkModeToggle />

        <router-link
          v-if="!isLogged"
          to="/login"
          class="rounded-lg bg-brand-500 px-3 py-1.5 text-sm text-white transition hover:bg-blue-700"
        >
          Login
        </router-link>

        <button
          v-else
          type="button"
          class="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition hover:bg-red-700"
          @click="logout"
        >
          Logout
        </button>

        <button
          type="button"
          class="relative rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open cart"
          @click="emit('toggle-cart')"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5m2 8-1 5m11-5 1 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span
            v-if="count > 0"
            class="absolute right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white"
          >
            {{ count }}
          </span>
        </button>
      </div>

      <button
        type="button"
        class="rounded-lg p-2 transition hover:bg-gray-100 md:hidden dark:hover:bg-gray-700"
        aria-label="Open mobile menu"
        @click="isOpen = !isOpen"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class="space-y-2 border-t px-3 pb-4 pt-3 md:hidden dark:border-gray-700">
      <DarkModeToggle />

      <router-link
        v-if="!isLogged"
        to="/login"
        class="block rounded-lg bg-brand-500 px-3 py-2 text-center text-sm text-white transition hover:bg-blue-700"
      >
        Login
      </router-link>

      <button
        v-else
        type="button"
        class="block w-full rounded-lg bg-red-500 px-3 py-2 text-left text-sm text-white transition hover:bg-red-700"
        @click="logout"
      >
        Logout
      </button>

      <button
        type="button"
        class="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
        @click="emit('toggle-cart')"
      >
        <span class="text-sm">Cart</span>
        <span v-if="count > 0" class="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
          {{ count }}
        </span>
      </button>
    </div>
  </header>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import DarkModeToggle from './DarkModeToggle.vue'

const emit = defineEmits<{
  (event: 'toggle-cart'): void
}>()

const cart = useCartStore()
const auth = useAuthStore()
const isOpen = ref(false)

const count = computed(() => cart.totalItems())
const isLogged = computed(() => !!auth.user)

function logout() {
  auth.logout()
  isOpen.value = false
}
</script>

<style scoped>
</style>
