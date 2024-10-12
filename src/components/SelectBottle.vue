<!-- eslint-disable vue/valid-v-model -->
<template>
  <div class="w-11/12 mb-12 flex md:flex-row flex-col gap-16">
    <div
      class="md:order-1 order-2 md:w-fit w-full my-12 w-auto flex flex-row justify-center items-end gap-8"
    >
      <ExoImage
        v-for="(bottle, index) in bottles"
        :key="index"
        class="shrink-0 w-auto md:max-h-[460px] max-h-[320px] max-w-[170px] object-contain transition-all duration-1000 cursor-pointer"
        :class="{
          'scale-125': bottle.value === bottleStore.bottle?.value,
          'scale-100': bottle.value !== bottleStore.bottle?.value
        }"
        :src="getImageURL(bottle)"
        @click="emit('selected')"
        @mouseover="setVariant(bottle)"
      />
    </div>
    <div
      class="md:order-2 order-1 md:w-fit w-full flex flex-col justify-center items-center gap-12"
    >
      <p class="font-header text-5xl text-white text-center">Pick your Bottle</p>
      <div
        v-if="!isTouch"
        class="md:w-96 w-full flex flex-col justify-center items-center gap-4 border p-4 border-white"
      >
        <p class="font-header text-2xl text-white">{{ bottleStore.bottle?.name }}</p>
      </div>
      <div class="w-96 md:block hidden">
        <slot name="navigation"></slot>
      </div>
    </div>
    <div class="order-3 w-full md:hidden block">
      <slot name="navigation"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ExoImage from '@/components/V-ExoImage.vue'
import { bottles } from '@/constants'
import type { Bottle } from '@/types'

import { useBottleStore } from '@/stores/bottle'

//Events
const emit = defineEmits<{
  (e: 'selected'): void
}>()
//End Events

const bottleStore = useBottleStore()

const isTouch = ref<boolean>(true)

function setVariant(variant: Bottle) {
  bottleStore.setBottle(variant)
}

function getImageURL(bottle: Bottle) {
  return new URL(`../assets/variants/${bottle.value}-WoodCork-Label.png`, import.meta.url).href
}

// Function to check the window width and conditionally set shouldTransform
function checkWindowSize() {
  // Change 768 to your desired breakpoint (for example, 768px for small screens)
  isTouch.value = window.innerWidth < 768
}

onMounted(() => {
  // Check on initial load
  checkWindowSize()
  // Add event listener for window resize
  window.addEventListener('resize', checkWindowSize)
})

onBeforeUnmount(() => {
  // Cleanup the event listener when the component is unmounted
  window.removeEventListener('resize', checkWindowSize)
})
</script>
