import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductsResponse } from '../types/product'

const BASE = 'https://dummyjson.com'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get<ProductsResponse>(`${BASE}/products`)
      products.value = res.data.products
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: number) {
    const res = await axios.get<Product>(`${BASE}/products/${id}`)
    return res.data
  }

  async function fetchCategories() {
    try {
      const res = await axios.get<string[]>(`${BASE}/products/categories`)
      categories.value = res.data
    } catch (err) {
      // ignore for now
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchCategories
  }
}
