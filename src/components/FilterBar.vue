<template>
  <div class="flex flex-wrap items-center gap-3">
    <select v-model="selected" @change="emitFilter" class="border rounded px-2 py-1 dark:bg-gray-700">
      <option value="">All Categories</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
    <select v-model="sort" @change="emitSort" class="border rounded px-2 py-1 dark:bg-gray-700">
      <option value="">Sort</option>
      <option value="price_asc">Price: Low - High</option>
      <option value="price_desc">Price: High - Low</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{ categories: string[] }>()
const emit = defineEmits<{
  (e: 'filter', category: string): void
  (e: 'sort', mode: string): void
}>()

const selected = ref('')
const sort = ref('')

function emitFilter() {
  emit('filter', selected.value)
}

function emitSort() {
  emit('sort', sort.value)
}
</script>

<style scoped></style>
