<template>
  <div class="relative w-[180px] h-auto flex flex-col justify-center items-center">
    <ExoImage
      class="max-w-[180px] w-[200px] h-full object-contain scale-100"
      v-model="imageSrc"
      @load="isBottleLoaded = true"
      @unload="isBottleLoaded = false"
    />
    <img
      v-if="isBottleLoaded"
      class="absolute w-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%]"
      :src="Label"
    />
    <div
      v-if="isBottleLoaded"
      class="absolute w-[95%] top-[57.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-header text-center text-neutral-300"
      v-html="formattedText"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import ExoImage from '@/components/V-ExoImage.vue'
import { Label } from '@/assets'

import { useBottleStore } from '@/stores/bottle'

const model = defineModel({ default: '' })

const imageSrc = computed(() => {
  return model.value
}) // Start with null, no image loaded yet

const formattedText = computed(() => {
  if (!bottleStore.bottleText) return ''
  return bottleStore.bottleText.replace(/\n/g, '<br>')
})

const bottleStore = useBottleStore()

const isBottleLoaded = ref(false)
</script>
