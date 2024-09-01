<template>
  <div class="flex flex-row gap-16">
    <div class="min-h-screen flex flex-row justify-center items-center">
      <LabeledBottle v-model="bottleStore.bottleImage" />
    </div>
    <div class="flex flex-col gap-3">
      <slot name="navigation"></slot>
      <p class="font-header text-5xl text-white">Review your Bottle</p>
      <p class="font-header text-lg text-white">Selected Bourbon:</p>
      <p class="font-body text-lg text-white">{{ bottleStore.whiskey?.name }}</p>
      <div class="w-full h-px bg-white"></div>
      <p class="font-header text-lg text-white">Bottle Style:</p>
      <p class="font-body text-lg text-white">{{ bottleStore.bottle?.name }}</p>
      <div class="w-full h-px bg-white"></div>
      <p class="font-header text-lg text-white">Wax Color:</p>
      <p class="font-body text-lg text-white">{{ bottleStore.bottleTop?.name }}</p>
      <div class="w-full h-px bg-white"></div>
      <p class="font-header text-lg text-white">Bottle Text:</p>
      <p class="font-body text-lg text-white">{{ bottleStore.bottleText }}</p>
      <div class="w-full h-px bg-white"></div>
      <p class="font-header text-lg text-white">Cost:</p>
      <p class="font-body text-lg text-white">$XXX.XX</p>
      <div class="mt-8 flex flex-row gap-4">
        <!-- <button
        class="w-1/2 px-8 py-4 rounded bg-black border-white font-header font-semibold text-white"
        @click="bottleStore.reset()"
      >
        Start Over
      </button> -->
        <button class="w-1/2 px-8 py-4 rounded bg-white font-header font-semibold text-black">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LabeledBottle from '@/components/LabeledBottle.vue'
import { useBottleStore } from '@/stores/bottle'

const bottleStore = useBottleStore()
</script>
