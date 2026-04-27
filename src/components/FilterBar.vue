<template>
  <section class="rounded-xl border bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-4">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <SearchBar :model-value="searchTerm" @update:model-value="(value) => emit('update:searchTerm', value)" />

      <label class="sr-only" for="category-filter">Filter by category</label>
      <select
        id="category-filter"
        :value="selectedCategory"
        class="rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 sm:text-base"
        @change="onCategoryChange"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.slug" :value="category.slug">
          {{ category.name }}
        </option>
      </select>

      <label class="sr-only" for="sort-filter">Sort products</label>
      <select
        id="sort-filter"
        :value="sortMode"
        class="rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 sm:text-base"
        @change="onSortChange"
      >
        <option value="">Sort by</option>
      <option value="price_asc">Price: Low - High</option>
      <option value="price_desc">Price: High - Low</option>
      </select>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ProductCategory } from '../types/product'
import SearchBar from './SearchBar.vue'

type SortMode = '' | 'price_asc' | 'price_desc'
const props = defineProps<{
  categories: ProductCategory[]
  searchTerm: string
  selectedCategory: string
  sortMode: SortMode
}>()
const emit = defineEmits<{
  (event: 'update:searchTerm', value: string): void
  (event: 'update:selectedCategory', value: string): void
  (event: 'update:sortMode', value: SortMode): void
}>()

function onCategoryChange(event: Event) {
  const target = event.target as HTMLSelectElement | null
  emit('update:selectedCategory', target?.value ?? props.selectedCategory)
}

function onSortChange(event: Event) {
  const target = event.target as HTMLSelectElement | null
  const value = target?.value ?? props.sortMode
  if (value === '' || value === 'price_asc' || value === 'price_desc') {
    emit('update:sortMode', value)
  }
}
</script>

<style scoped></style>
