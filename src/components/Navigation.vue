<template>
  <div class="flex flex-row gap-4">
    <div
      v-if="currentStep > 0"
      class="w-11 h-11 flex flex-col justify-center items-center bg-white cursor-pointer"
      @click="emit('previous')"
    >
      <svg
        width="11"
        height="18"
        viewBox="0 0 11 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 1L2 9L10 17" stroke="#070707" stroke-width="1.5" />
      </svg>
    </div>
    <div
      v-if="currentStep < numberOfSteps - 1"
      class="w-11 h-11 flex flex-col justify-center items-center bg-black border border-white cursor-pointer"
      @click="emit('next')"
    >
      <svg
        width="11"
        height="18"
        viewBox="0 0 11 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 17L9 9L1 1" stroke="#FFFDEF" stroke-width="1.5" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
export interface Props {
  currentStep: number
  numberOfSteps: number
}

const props = withDefaults(defineProps<Props>(), {})
// End Props

//Events
const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'next'): void
}>()
//End Events
</script>
