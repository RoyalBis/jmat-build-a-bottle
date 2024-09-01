<template>
  <div class="relative flex flex-row justify-center items-center">
    <div
      class="max-w-[inherit] max-h-[inherit] transition-[opacity] duration-200"
      :class="{
        'scale-0': !shouldLoad,
        'opacity-0': !shouldLoad,
        'scale-100': shouldLoad,
        'opacity-100': shouldLoad
      }"
    >
      <img
        v-show="shouldLoad"
        class="max-w-[inherit] max-h-[inherit] object-contain"
        :src="imageSrc"
        alt="Loaded Image"
        @load="onImageLoad"
      />
    </div>

    <div
      class="max-w-[inherit] max-h-[inherit] transition-[opacity] duration-200"
      :class="{
        'scale-0': shouldLoad,
        'opacity-0': shouldLoad,
        'scale-100': !shouldLoad,
        'opacity-100': !shouldLoad
      }"
    >
      <transition>
        <slot name="loadingAnimation">
          <LoadingAnimation
            v-if="!shouldLoad"
            class="max-w-[inherit] max-h-[inherit] object-contain"
          />
        </slot>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'

import LoadingAnimation from './LoadingAnimation.vue'

const model = defineModel<string>()

// Props
export interface Props {
  src?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: () => 0
})
// End Props

// Define Event
const emit = defineEmits<{
  (event: 'load'): void
  (event: 'unload'): void
}>()
// End Event

const imageSrc = computed(() => {
  return model.value ?? props.src
}) // Start with null, no image loaded yet

// Reactive data properties
const imageLoaded = ref(false)
const delayPassed = ref(false)

const shouldLoad = computed(() => {
  console.log('what')
  return imageLoaded.value && delayPassed.value
})

// Method to handle image load event
const onImageLoad = () => {
  imageLoaded.value = true
}

watchEffect(() => {
  if (shouldLoad.value) {
    emit('load')
  } else {
    imageLoaded.value = false
    emit('unload')
  }
})

watch(
  () => imageSrc.value,
  () => {
    setTimeout(() => {
      delayPassed.value = true
    }, props.delay)
  },
  { immediate: true }
)
</script>

<style>
.v-enter-active {
  transition: opacity 1s ease-in-out;
}

.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-leave-from {
  opacity: 0;
}

.v-leave-to {
  opacity: 0;
}

.v-leave-active {
  /* No transition for leave */
  opacity: 0;
}

/* Alternatively, you can also remove the transition property if you don't want any leave effect */
</style>
