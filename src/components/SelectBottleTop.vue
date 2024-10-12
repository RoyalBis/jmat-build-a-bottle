<template>
  <div class="w-11/12 mb-12 flex md:flex-row flex-col gap-16">
    <div v-if="isVerticalLayout" class="w-full flex flex-col justify-center items-center gap-4">
      <p class="font-header text-5xl text-white text-center">Pick your style</p>
      <p class="font-header text-lg text-white text-center">
        Pick your wax: {{ bottleStore.bottleTop?.name }}
      </p>
    </div>
    <div class="flex flex-row justify-center items-center gap-8">
      <LabeledBottle v-model="image" />
      <div
        v-if="isVerticalLayout"
        class="controls grid gap-2"
        id="color-controls"
        :style="{
          'grid-template-columns': isVerticalLayout
            ? 'repeat(2, minmax(0, 42px))'
            : 'repeat(8, minmax(0, 42px))'
        }"
      >
        <ColorSwatch
          v-for="(top, index) in bottleTops"
          :key="index"
          :color="top.color"
          :option="top.value"
          :icon="top.icon"
          :is-selected="bottleStore.bottleTop?.value === top.value"
          @click="setVariant(top)"
          @mouseover="setPreview(top)"
          @mouseout="clearPreview()"
        />
      </div>
    </div>
    <div class="flex flex-col justify-start items-start gap-16">
      <div v-if="!isVerticalLayout" class="w-full flex flex-col gap-4">
        <p class="font-header text-5xl text-white">Pick your style</p>
      </div>
      <div v-if="!isVerticalLayout" class="flex flex-col gap-4">
        <p class="font-header text-lg text-white">
          Pick your wax: {{ bottleStore.bottleTop?.name }}
        </p>
        <div class="controls color-picker grid gap-2" id="color-controls">
          <ColorSwatch
            v-for="(top, index) in bottleTops"
            :key="index"
            :color="top.color"
            :option="top.value"
            :icon="top.icon"
            :is-selected="bottleStore.bottleTop?.value === top.value"
            @click="setVariant(top)"
            @mouseover="setPreview(top)"
            @mouseout="clearPreview()"
          />
        </div>
      </div>
      <div class="w-full">
        <p class="font-header text-lg text-white">Customize your label:</p>
        <textarea
          v-model="bottleStore.bottleText"
          class="w-full p-4 resize-none rounded-0 h-24 bg-black border border-white text-white"
        ></textarea>
        <p class="font-body text-xs text-white">
          Make it personal. Use up to 25 characters. Have fun.
        </p>
      </div>
      <div class="w-full md:block hidden">
        <slot name="navigation"></slot>
      </div>
    </div>
    <div class="w-full md:hidden block">
      <slot name="navigation"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ColorSwatch from '@/components/ColorSwatch.vue'

import { useBottleStore } from '@/stores/bottle'
import { bottleTops } from '@/constants'
import type { BottleTop } from '@/types'

import LabeledBottle from './LabeledBottle.vue'

const isVerticalLayout = ref<boolean>(true)

const bottleStore = useBottleStore()

const previewImage = ref<string | null>(null)

const image = computed(() => {
  return previewImage.value ?? bottleStore.bottleImage
})

function clearPreview() {
  previewImage.value = null
}

function setPreview(option: BottleTop) {
  previewImage.value = new URL(
    `../assets/variants/${bottleStore?.bottle?.value}-${option.value}.png`,
    import.meta.url
  ).href
}

function setVariant(variant: BottleTop) {
  bottleStore.setBottleTop(variant)
  // currentBottle.value = variant
}

// Function to check the window width and conditionally set shouldTransform
function checkWindowSize() {
  // Change 768 to your desired breakpoint (for example, 768px for small screens)
  isVerticalLayout.value = window.innerWidth < 768
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
