<template>
  <div class="relative w-full flex flex-row gap-4">
    <div class="md:w-fit w-[300px] h-[300px] overflow-y-hidden">
      <div
        class="relative w-fit min-h-[300px] py-4 flex flex-row transition-transform duration-1000 ease-in-out overflow-hidden"
        :style="{ transform: shouldTransform ? `translateX(-${currentIndex * 300}px)` : 'none' }"
      >
        <div
          v-for="(whiskey, index) in whiskeys"
          :key="index"
          class="relative w-[300px] h-[300px] flex flex-row justify-center items-end gap-4 transition-all duration-1000 cursor-pointer overflow-hidden"
          :class="{
            'scale-125': whiskey.name === bottleStore.whiskey?.name,
            'scale-100': whiskey.name !== bottleStore.whiskey?.name,
            'z-10': whiskey.name === bottleStore.whiskey?.name
          }"
          @mouseover="setOption(whiskey, index)"
          @click="handleClicked(whiskey, index)"
        >
          <ExoImage
            class="h-full max-h-[600px] max-w-[220px] object-contain"
            :src="WoodBarrelTop"
            @load="loadedImages.push(WoodBarrelTop)"
          />
          <p
            v-if="loadedImages.includes(WoodBarrelTop)"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-header text-2xl font-bold text-white text-center drop-shadow-md"
            style="text-shadow: #000 1px 0 10px"
          >
            {{ whiskey.name }}
          </p>
        </div>
      </div>
    </div>
    <div class="md:hidden absolute top-1/2 -left-[32px] text-white" @click="prevSlide">
      <IconArrowLeft class="w-10 h-10" />
    </div>
    <div class="md:hidden absolute top-1/2 -right-[32px] text-white" @click="nextSlide">
      <IconArrowRight class="w-10 h-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

import ExoImage from '@/components/V-ExoImage.vue'
import IconArrowRight from './icons/IconArrowRight.vue'
import IconArrowLeft from './icons/IconArrowLeft.vue'

import { WoodBarrelTop } from '@/assets'

import { whiskeys } from '@/constants'

import { useBottleStore } from '@/stores/bottle'

import type { Whiskey } from '@/types'

//Events
const emit = defineEmits<{
  (e: 'click'): void
}>()
//End Events

const currentIndex = ref<number>(0)

const bottleStore = useBottleStore()

const loadedImages = ref<Array<string>>([])

const shouldTransform = ref<boolean>(true)

function nextSlide() {
  if (currentIndex.value < whiskeys.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  setOption(whiskeys[currentIndex.value], currentIndex.value)
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = whiskeys.length - 1
  }
}

function setOption(option: Whiskey, index: number) {
  bottleStore.setWhiskey(option)
  currentIndex.value = index
}

function handleClicked(option: Whiskey, index: number) {
  emit('click')
}

// Function to check the window width and conditionally set shouldTransform
function checkWindowSize() {
  // Change 768 to your desired breakpoint (for example, 768px for small screens)
  shouldTransform.value = window.innerWidth < 768
}

watchEffect(() => {
  setOption(whiskeys[currentIndex.value], currentIndex.value)
})

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
