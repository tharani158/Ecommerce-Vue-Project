<template>
  <button @click="toggle" class="p-2 rounded bg-gray-100 dark:bg-gray-700">
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
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
