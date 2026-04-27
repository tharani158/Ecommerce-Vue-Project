<template>
  <button
    type="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
  >
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
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  } catch {}
  apply(isDark.value)
})
</script>

<style scoped></style>
