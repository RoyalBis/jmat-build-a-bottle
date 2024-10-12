<template>
  <div class="w-11/12 mb-12 h-full flex flex-col justify-start items-start gap-12">
    <p class="font-header text-5xl text-white text-center">Pick your Whiskey</p>
    <div class="flex flex-row gap-16">
      <Carousel @click="handleClicked" />
    </div>
    <div class="md:w-[500px] w-full h-full flex flex-col items-center gap-6">
      <div
        v-if="bottleStore.hasWhiskey"
        class="w-1/4 min-w-full h-48 flex flex-col justify-center items-center gap-4 border p-12 border-white"
      >
        <p class="font-header font-bold text-xl text-white text-center">
          {{ bottleStore.whiskey?.mix }}
        </p>
        <p class="font-header text-xl text-white">
          Distilled in {{ bottleStore.whiskey?.location }}
        </p>
      </div>
    </div>
    <div class="w-full md:hidden block">
      <slot name="navigation"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExoImage from '@/components/V-ExoImage.vue'
import Carousel from './Carousel.vue'

import { WoodBarrelTop } from '@/assets'

import { whiskeys } from '@/constants'

import { useBottleStore } from '@/stores/bottle'

import type { Whiskey } from '@/types'
//Events
const emit = defineEmits<{
  (e: 'selected'): void
}>()
//End Events

const bottleStore = useBottleStore()

const loadedImages = ref<Array<string>>([])

const flickityOptions = ref({
  initialIndex: 0,
  pageDots: false,
  wrapAround: true
})

function setOption(option: Whiskey) {
  bottleStore.setWhiskey(option)
  // emit('selected')
}

function handleClicked() {
  emit('selected')
}
</script>
