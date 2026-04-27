import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductCategory, ProductsResponse } from '../types/product'

const BASE = 'https://dummyjson.com'

export function useProducts() {
  const products = ref<Product[]>([])
  const categories = ref<ProductCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get<ProductsResponse>(`${BASE}/products?limit=100`)
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
      const res = await axios.get<ProductCategory[]>(`${BASE}/products/categories`)
      categories.value = res.data
    } catch {
      categories.value = []
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
