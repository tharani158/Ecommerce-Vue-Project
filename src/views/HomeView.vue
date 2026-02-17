<template>
  <div class="w-full">
    <div class="mb-6 sm:mb-8">
      <FilterBar :categories="categories" @filter="onFilter" @sort="onSort" />
    </div>

    <ProductGrid :products="displayed" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductGrid from '../components/ProductGrid.vue'
import FilterBar from '../components/FilterBar.vue'

const { products, fetchProducts, categories, fetchCategories } = useProducts()
const search = ref('')
const category = ref('')
const sortMode = ref('')

onMounted(async () => {
  await fetchProducts()
  await fetchCategories()
  window.addEventListener('global-search', (e: Event) => {
    const detail = (e as CustomEvent<string>).detail
    search.value = detail
  })
})

function onFilter(cat: string) {
  category.value = cat
}

function onSort(mode: string) {
  sortMode.value = mode
}

const displayed = computed(() => {
  let list = products.value.slice()
  if (search.value) {
    const s = search.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(s))
  }
  if (category.value) list = list.filter(p => p.category === category.value)
  if (sortMode.value === 'price_asc') list.sort((a, b) => a.price - b.price)
  if (sortMode.value === 'price_desc') list.sort((a, b) => b.price - a.price)
  return list
})

</script>

<style scoped></style>
