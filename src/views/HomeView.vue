<template>
  <div class="w-full">
    <div class="mb-6 sm:mb-8">
      <FilterBar
        :categories="categories"
        :search-term="searchTerm"
        :selected-category="selectedCategory"
        :sort-mode="sortMode"
        @update:search-term="searchTerm = $event"
        @update:selected-category="selectedCategory = $event"
        @update:sort-mode="sortMode = $event"
      />
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Loading products...</p>
    <p v-else-if="error" class="text-sm text-red-500">{{ error }}</p>
    <ProductGrid v-else :products="displayed" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import FilterBar from '../components/FilterBar.vue'
import ProductGrid from '../components/ProductGrid.vue'
import { useProducts } from '../composables/useProducts'

type SortMode = '' | 'price_asc' | 'price_desc'

const { products, fetchProducts, categories, fetchCategories, loading, error } = useProducts()
const searchTerm = ref('')
const selectedCategory = ref('')
const sortMode = ref<SortMode>('')

onMounted(async () => {
  await fetchProducts()
  await fetchCategories()
})

const displayed = computed(() => {
  let list = products.value.slice()
  if (searchTerm.value) {
    const loweredSearchTerm = searchTerm.value.toLowerCase()
    list = list.filter(
      (product) =>
        product.title.toLowerCase().includes(loweredSearchTerm) ||
        product.description.toLowerCase().includes(loweredSearchTerm)
    )
  }
  if (selectedCategory.value) list = list.filter((product) => product.category === selectedCategory.value)
  if (sortMode.value === 'price_asc') list.sort((first, second) => first.price - second.price)
  if (sortMode.value === 'price_desc') list.sort((first, second) => second.price - first.price)
  return list
})
</script>
