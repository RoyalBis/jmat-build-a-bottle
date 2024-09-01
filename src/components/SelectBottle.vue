<!-- eslint-disable vue/valid-v-model -->
<template>
  <div class="flex flex-row gap-16">
    <div class="w-auto flex flex-row items-end gap-8">
      <ExoImage
        v-for="(bottle, index) in bottles"
        :key="index"
        class="shrink-0 w-auto max-h-[460px] max-w-[170px] object-contain transition-all cursor-pointer"
        :class="{
          'scale-125': bottle.value === bottleStore.bottle?.value,
          'scale-100': bottle.value !== bottleStore.bottle?.value
        }"
        :src="getImageURL(bottle)"
        @click="emit('selected')"
        @mouseover="setVariant(bottle)"
      />
    </div>
    <!-- <div class="min-w-[400px] h-full flex flex-col gap-6">
      
      <p class="font-header text-5xl text-white">Pick your bottle</p>
      <p class="font-header text-3xl text-white">{{ bottleStore.bottle?.name }}</p>
      <div class="w-full h-px bg-white"></div>
      <p class="font-header text-lg text-white">{{ bottleStore.bottle?.dimensions }}</p>
      <p class="font-header text-lg text-white">{{ bottleStore.bottle?.volume }}</p>
      <div class="w-full h-px bg-white"></div>
    </div> -->
    <!-- <slot name="navigation"></slot> -->
    <div class="flex flex-col justify-center items-center gap-12">
      <slot name="navigation"></slot>
      <p class="font-header text-5xl text-white">Pick your Bottle</p>
      <div class="w-full flex flex-col justify-center items-center gap-4 border p-4 border-white">
        <!-- <slot name="navigation"></slot> -->
        <p class="font-header text-2xl text-white">{{ bottleStore.bottle?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

function setVariant(variant: Bottle) {
  bottleStore.setBottle(variant)
}

function getImageURL(bottle: Bottle) {
  return new URL(`../assets/variants/${bottle.value}-WoodCork-Label.png`, import.meta.url).href
}
</script>
