<template>
  <button 
    @click="toggle" 
    class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition inline-flex items-center justify-center w-10 h-10">
    <span v-if="isDark" class="text-xl">🌙</span>
    <span v-else class="text-xl">☀️</span>
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function apply(dark: boolean) {
  const html = document.documentElement
  if (dark) html.classList.add('dark')
  else html.classList.remove('dark')
}

function toggle() {
  isDark.value = !isDark.value
  apply(isDark.value)
  localStorage.setItem('theme_dark', JSON.stringify(isDark.value))
}

onMounted(() => {
  try {
    const raw = localStorage.getItem('theme_dark')
    if (raw) {
      isDark.value = JSON.parse(raw) as boolean
    }
  } catch {}
  apply(isDark.value)
})
</script>

<style scoped></style>
