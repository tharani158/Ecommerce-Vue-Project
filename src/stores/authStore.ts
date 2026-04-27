import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { LoginRequest, User } from '../types/product'

const AUTH_KEY = 'ecom_auth_v1'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  function load() {
    const raw = localStorage.getItem(AUTH_KEY)
    if (raw) {
      try {
        user.value = JSON.parse(raw) as User
      } catch {
        user.value = null
      }
    }
  }

  function persist() {
    if (user.value) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user.value))
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  async function login(username: string, password: string) {
    const payload: LoginRequest = {
      username,
      password
    }
    const res = await axios.post<User>('https://dummyjson.com/auth/login', payload)
    const data = res.data
    user.value = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      token: data.token
    }
    persist()
    return user.value
  }

  function logout() {
    user.value = null
    persist()
  }

  load()

  return { user, login, logout }
})
