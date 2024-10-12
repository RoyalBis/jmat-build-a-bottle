<template>
  <div>
    <div
      v-if="shouldDisplayLoader"
      class="w-screen min-h-screen flex flex-col justify-center items-center bg-stone-900 scale-100"
    >
      <div class="max-w-[90%] h-32 md:mb-12 mb-0 flex flex-col justify-center items-center">
        <img :src="CraftYourBottle" />
      </div>
      <LoadingAnimation />
    </div>
    <div
      v-if="!shouldDisplayLoader"
      class="relative w-full min-h-screen h-auto bg-slate-800 flex flex-col justify-top items-center"
      :style="backgroundImageStyle"
    >
      <div>
        <div
          class="hover:scale-110 cursor-pointer transition-all duration-1000"
          @click="handleExitClicked"
        >
          <p class="my-4 font-header text-lg text-white text-center underline">
            Back to J. Mattingly
          </p>
        </div>
        <div
          class="max-w-[75%] md:max-w-[90%] mt-4 md:mb-12 mb-12 flex flex-col justify-center items-center"
        >
          <img :src="CraftYourBottle" />
        </div>
      </div>
      <div class="w-11/12 flex flex-col justify-center items-center">
        <Transition name="fade" @before-enter="beforeEnter" @leave="leave">
          <SelectWhiskey
            v-if="currentStep === Step.SelectWhiskey"
            class="flex flex-row justify-start items-center transition-opacity"
            @selected="handleNext(bottleStore.hasWhiskey)"
          >
            <template #navigation>
              <Navigation
                class="justify-end"
                @next="handleNext"
                @previous="handlePrevious"
                :current-step="currentStep"
                :number-of-steps="steps.length"
              />
            </template>
          </SelectWhiskey>
        </Transition>
        <Transition name="fade" @before-enter="beforeEnter" @leave="leave">
          <SelectBottle
            v-if="currentStep === Step.SelectBottle"
            class="flex flex-row justify-center items-center"
            @selected="handleNext"
          >
            <template #navigation>
              <Navigation
                class="justify-end"
                @next="handleNext(bottleStore.hasBottle)"
                @previous="handlePrevious"
                :current-step="currentStep"
                :number-of-steps="steps.length"
              />
            </template>
          </SelectBottle>
        </Transition>
        <Transition name="fade" @before-enter="beforeEnter" @leave="leave">
          <SelectBottleTop
            v-if="currentStep === Step.SelectTop"
            class="flex flex-row justify-center items-center"
          >
            <template #navigation>
              <Navigation
                class="justify-end"
                @next="handleNext(bottleStore.hasBottleTop)"
                @previous="handlePrevious"
                :current-step="currentStep"
                :number-of-steps="steps.length"
              />
            </template>
          </SelectBottleTop>
        </Transition>
        <Transition name="fade" @before-enter="beforeEnter" @leave="leave">
          <BottleReview
            v-if="currentStep === Step.Review"
            class="flex flex-row justify-center items-center"
            @checkout="handleCheckout"
          >
            <template #navigation>
              <Navigation
                class="justify-end"
                @next="handleNext(bottleStore.isValid)"
                @previous="handlePrevious"
                :current-step="currentStep"
                :number-of-steps="steps.length"
              />
            </template>
          </BottleReview>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import SelectWhiskey from '@/components/SelectWhiskey.vue'
import SelectBottle from '@/components/SelectBottle.vue'
import SelectBottleTop from '@/components/SelectBottleTop.vue'
import BottleReview from '@/components/BottleReview.vue'
import Navigation from '@/components/Navigation.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'

import { Background, CraftYourBottle } from '@/assets'

import { useBottleStore } from '@/stores/bottle'
import router from '@/router'

import { useImagePreloader } from '@/composables/useImagePreloader'
import { variantImages } from '@/constants'

const isLoadingTimeoutOver = ref(false)
const { isLoading } = useImagePreloader(variantImages)

const bottleStore = useBottleStore()

const isCheckout = ref(false)

const enum Step {
  SelectWhiskey = 0,
  SelectBottle,
  SelectTop,
  Review
}

const steps = ref([Step.SelectWhiskey, Step.SelectBottle, Step.SelectTop, Step.Review])

function beforeEnter(el: Element) {
  ;(el as HTMLElement).style.opacity = '1'
}

function leave(el: Element, done: () => void) {
  ;(el as HTMLElement).style.opacity = '0'
  done() // Ensure the transition ends immediately
}

const currentStep = ref<Step>(Step.SelectWhiskey)

const backgroundImageStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .1)), linear-gradient(to top, rgba(0, 0, 0, .8), rgba(0, 0, 0, .1)), linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)), linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)), url(${Background})`
  }
})

const shouldDisplayLoader = computed(() => {
  return (isLoading.value && !isLoadingTimeoutOver.value) || isCheckout.value
})

function handlePrevious() {
  if (currentStep.value > 0) {
    currentStep.value--
  } else {
    router.back()
  }
}

function handleNext(valid: boolean = true) {
  if (!valid) return
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  } else {
    //Submit
  }
}

function handleCheckout() {
  isCheckout.value = true
}

function handleExitClicked() {
  window.location.href = 'https://jmattingly1845.myshopify.com/'
}

onMounted(() => {
  setTimeout(() => {
    isLoadingTimeoutOver.value = true
  }, 3000)
})
</script>

<style>
.color-picker {
  grid-template-columns: repeat(8, minmax(0, 42px));
}

.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-active {
  transition: none; /* Immediate disappearance */
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
