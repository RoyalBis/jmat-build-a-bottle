<template>
  <div class="w-11/12 mb-12 flex md:flex-row flex-col gap-16">
    <div class="flex flex-row justify-center items-center">
      <LabeledBottle v-model="bottleStore.bottleImage" />
    </div>
    <div class="flex flex-col gap-3">
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
      <p v-if="variant" class="font-body text-lg text-white">
        ${{ Number(variant.price.amount).toFixed(2) }} {{ variant.price.currency }}
      </p>
      <div class="h-16 mt-8 flex flex-row justify-center gap-4">
        <button
          class="w-1/2 px-8 py-4 rounded bg-white font-header text-xl font-semibold text-black"
          @click="handleCheckout"
        >
          Checkout
        </button>
      </div>
      <div>
        <slot name="navigation"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LabeledBottle from '@/components/LabeledBottle.vue'

import { useBottleStore } from '@/stores/bottle'
import { useShopify } from '@/composables/useShopify'

import { findMatchingVariant, type ProductVariant } from '@/utils/products'

//Events
const emit = defineEmits<{
  (e: 'checkout'): void
}>()
//End Events

const bottleStore = useBottleStore()

const { getProductById, createCart } = useShopify()

const variant = ref<ProductVariant | undefined>()

async function handleCheckout() {
  emit('checkout')
  if (!variant.value) return
  const cart = await createCart(
    variant.value.id,
    bottleStore.bottleTop?.name ?? '',
    bottleStore.bottleText ?? ''
  )

  if (cart.data['cartCreate']['cart']['checkoutUrl']) {
    // bottleStore.reset()
    window.location.href = cart.data['cartCreate']['cart']['checkoutUrl']
  }
}

onMounted(async () => {
  const { data, errors, extensions } = await getProductById('8445493182595')
  variant.value = findMatchingVariant(
    data['product']['variants']['nodes'],
    bottleStore.selectedOptions
  )
  console.log(variant.value)

  if (!variant.value?.id) return
})
</script>
