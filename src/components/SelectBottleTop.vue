<template>
  <div class="flex flex-row gap-16">
    <div class="h-[260px] flex flex-row justify-center items-center">
      <LabeledBottle v-model="image" />
    </div>
    <div class="flex flex-col justify-start items-start gap-16">
      <div class="w-full flex flex-col gap-4">
        <slot name="navigation"></slot>
        <p class="font-header text-5xl text-white">Pick your style</p>
      </div>
      <div class="flex flex-col gap-4">
        <p class="font-header text-lg text-white">
          Pick your wax: {{ bottleStore.bottleTop?.name }}
        </p>
        <div class="controls color-picker grid gap-2" id="color-controls">
          <ColorSwatch
            v-for="(top, index) in bottleTops"
            :key="index"
            :color="top.color"
            :option="top.value"
            :is-selected="bottleStore.bottleTop?.value === top.value"
            @click="setVariant(top)"
            @mouseover="setPreview(top)"
            @mouseout="clearPreview()"
          />
        </div>
      </div>
      <div>
        <p class="font-header text-lg text-white">Customize your label:</p>
        <textarea
          v-model="bottleStore.bottleText"
          class="w-full p-4 resize-none rounded-0 h-24 bg-black border border-white text-white"
        ></textarea>
        <p class="font-body text-xs text-white">
          Make it personal. Use up to 25 characters. Have fun.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ColorSwatch from '@/components/ColorSwatch.vue'

import { useBottleStore } from '@/stores/bottle'
import { bottleTops } from '@/constants'
import type { BottleTop } from '@/types'

import LabeledBottle from './LabeledBottle.vue'

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

// function setColor(color: string) {
//   if (!modelViewerRef.value?.model) return

//   const [material] = modelViewerRef.value.model.materials
//   material.pbrMetallicRoughness.setBaseColorFactor(color)
// }
</script>
