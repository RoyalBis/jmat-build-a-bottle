<template>
  <div class="w-full flex flex-row justify-center items-center gap-4">
    <div
      v-if="hasPrevious"
      class="max-w-1/2 w-1/2 h-16 flex flex-row justify-center items-center gap-4 bg-transparent border border-white cursor-pointer"
      @click="emit('previous')"
    >
      <svg
        width="11"
        height="18"
        viewBox="0 0 11 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 1L2 9L10 17" stroke="#ffffff" stroke-width="1.5" />
      </svg>
      <p class="font-header font-bold text-xl text-white upperclass">Previous</p>
    </div>
    <div
      v-if="hasNext"
      class="max-1/2 w-1/2 h-16 flex flex-row justify-center items-center gap-4 bg-white border border-white cursor-pointer"
      @click="emit('next')"
    >
      <p class="font-header font-bold text-xl text-black upperclass">Next</p>

      <svg
        width="11"
        height="18"
        viewBox="0 0 11 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 17L9 9L1 1" stroke="#000000" stroke-width="1.5" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigation } from '@/composables/navigation'

//Events
const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'next'): void
}>()
//End Events

const { hasNext, hasPrevious } = useNavigation()
</script>
