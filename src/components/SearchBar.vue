<template>
  <div>
    <input 
      v-model="q" 
      @input="emitSearch" 
      placeholder="Search products..." 
      class="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const q = ref('')

function emitSearch() {
  emit('search', q.value)
}
</script>

<style scoped></style>
