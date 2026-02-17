<template>
  <div>
    <input v-model="q" @input="emitSearch" placeholder="Search products..." class="border rounded px-3 py-1 w-64 dark:bg-gray-700 dark:border-gray-600" />
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
