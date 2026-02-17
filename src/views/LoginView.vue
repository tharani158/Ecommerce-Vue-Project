<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Login</h2>
    <form @submit.prevent="doLogin" class="space-y-3">
      <input v-model="username" placeholder="username" class="w-full border px-3 py-2 rounded dark:bg-gray-700" />
      <input v-model="password" placeholder="password" type="password" class="w-full border px-3 py-2 rounded dark:bg-gray-700" />
      <div class="flex items-center justify-between">
        <button class="px-4 py-2 bg-brand-500 text-white rounded">Sign in</button>
        <div class="text-sm text-gray-500">Try: kminchelle / 0lelplR</div>
      </div>
    </form>
    <div v-if="error" class="mt-3 text-red-500">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const auth = useAuthStore()
const router = useRouter()

async function doLogin() {
  error.value = null
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>

<style scoped></style>
