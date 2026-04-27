<template>
  <div>
    <label for="product-search" class="sr-only">Search products</label>
    <input
      id="product-search"
      :value="modelValue"
      type="search"
      placeholder="Search products..."
      class="w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const input = event.target as HTMLInputElement | null
  emit('update:modelValue', input?.value ?? props.modelValue)
}
</script>

<style scoped></style>
