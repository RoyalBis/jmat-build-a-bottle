<template>
  <div class="h-full flex flex-col justify-start items-start gap-12">
    <!-- <slot name="navigation"></slot> -->
    <p class="font-header text-5xl text-white">Pick your Whiskey</p>
    <div class="flex flex-row gap-16">
      <div
        v-for="(whiskey, index) in whiskeys"
        :key="index"
        class="relative w-auto flex flex-row justify-center items-end gap-4 transition-transform cursor-pointer"
        :class="{
          'scale-125': whiskey.name === bottleStore.whiskey?.name,
          'scale-100': whiskey.name !== bottleStore.whiskey?.name
        }"
        @mouseover="setOption(whiskey)"
        @click="emit('selected')"
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
    <div class="w-full h-full flex flex-col items-center gap-6">
      <div
        v-if="bottleStore.hasWhiskey"
        class="w-1/4 flex flex-col justify-center items-center gap-4 border p-12 border-white"
      >
        <p class="font-header text-xl text-white">{{ bottleStore.whiskey?.mix }}</p>
        <p class="font-header text-xl text-white">
          Distilled in {{ bottleStore.whiskey?.location }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExoImage from '@/components/V-ExoImage.vue'

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

function setOption(option: Whiskey) {
  bottleStore.setWhiskey(option)
  // emit('selected')
}
</script>
