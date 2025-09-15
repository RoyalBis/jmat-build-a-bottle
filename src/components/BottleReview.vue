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
      <div class="w-full flex flex-row">
        <div class="w-full flex flex-col gap-2">
          <p class="font-header text-lg text-white">Quantity:</p>
          <div class="flex flex-row items-center justify-between gap-2">
            <div class="flex flex-row items-center justify-between gap-2">
              <div
                class="w-10 h-10 rounded flex flex-row justify-center items-center bg-white"
                @click="decrementQty"
              >
                <p class="font-body text-2xl text-black">-</p>
              </div>
              <div
                class="w-10 h-10 flex flex-row justify-center items-center bg-transparend border-white border rounded"
              >
                <p class="font-body text-xl text-white">{{ quantity }}</p>
              </div>
              <div
                class="w-10 h-10 rounded flex flex-row justify-center items-center bg-white"
                @click="incrementQty"
              >
                <p class="font-body text-2xl text-black">+</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-header text-lg text-white">Cost:</p>
          <p v-if="variant" class="font-body text-lg text-white">
            ${{ (Number(variant.price.amount) * quantity).toFixed(2) }} {{ variant.price.currency }}
          </p>
        </div>
      </div>
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

const quantity = ref(1)

function decrementQty() {
  if (quantity.value > 1) quantity.value--
}

function incrementQty() {
  quantity.value++
}

async function handleCheckout() {
  emit('checkout')
  if (!variant.value) return
  const cart = await createCart(
    {
      id: variant.value.id,
      wax: bottleStore.bottleTop?.name ?? '',
      text: bottleStore.bottleText ?? ''
    },
    quantity.value
  )

  if (cart.data['cartCreate']['cart']['checkoutUrl']) {
    // bottleStore.reset()
    window.location.href = cart.data['cartCreate']['cart']['checkoutUrl']
  }
}

onMounted(async () => {
  const { data } = await getProductById('8445493182595')
  variant.value = findMatchingVariant(
    data['product']['variants']['nodes'],
    bottleStore.selectedOptions
  )

  if (!variant.value?.id) return
})
</script>
