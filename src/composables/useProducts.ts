import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductsResponse } from '../types/product'

const BASE = 'https://dummyjson.com'

export function useProducts() {
  type CategoryShape = { slug: string; name: string }

  const products = ref<Product[]>([])
  const categories = ref<CategoryShape[]>([])
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

  const categoryMap: Record<string, string> = {
    beauty: 'Beauty',
    furniture: 'Furniture',
    groceries: 'Groceries'
  }

  const allowedSlugs = Object.keys(categoryMap)

  async function fetchCategories() {
    try {
      const res = await axios.get<string[] | Array<{slug:string,name:string}>>(`${BASE}/products/categories`)
      const rawCategories = res.data

      categories.value = rawCategories
        .map(item => {
          if (typeof item === 'string') {
            return { slug: item, name: categoryMap[item] || item }
          }
          const slug = item.slug || item.name.toLowerCase().replace(/\s+/g, '-')
          return { slug, name: categoryMap[slug] || item.name || slug }
        })
        .filter(cat => allowedSlugs.includes(cat.slug))
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
