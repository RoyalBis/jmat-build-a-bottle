<template>
  <div class="">
    <div
      v-if="isLoading"
      class="w-screen h-screen min-h-100 flex flex-col justify-center items-center bg-stone-900 scale-100"
    >
      <LoadingAnimation />
    </div>
    <div
      v-if="!isLoading"
      class="relative min-h-100 max-h-screen h-screen bg-slate-800 flex flex-col justify-center items-center"
      :style="backgroundImageStyle"
    >
      <div class="w-full h-32 mb-12 flex flex-col justify-center items-center">
        <img :src="CraftYourBottle" />
      </div>
      <Transition name="fade" @before-enter="beforeEnter" @leave="leave">
        <SelectWhiskey
          v-if="currentStep === Step.SelectWhiskey"
          class="grow min-w-screen w-screen flex flex-row justify-start items-center transition-opacity"
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
          class="grow min-w-screen min-h-screen max-h-screen w-screen flex flex-row justify-center items-center"
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
          class="grow min-w-screen max-h-screen w-screen flex flex-row justify-center items-center"
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
          class="grow min-w-screen max-h-screen w-screen flex flex-row justify-center items-center"
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
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import SelectWhiskey from '@/components/SelectWhiskey.vue'
import SelectBottle from '@/components/SelectBottle.vue'
import SelectBottleTop from '@/components/SelectBottleTop.vue'
import BottleReview from '@/components/BottleReview.vue'
import Navigation from '@/components/Navigation.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'

import { TBBTallCanBishop, Background, CraftYourBottle } from '@/assets'

import { useBottleStore } from '@/stores/bottle'
import router from '@/router'

import { useImagePreloader } from '@/composables/useImagePreloader'
import { variantImages } from '@/constants'

const { isLoading, loadedImages } = useImagePreloader(variantImages)

const bottleStore = useBottleStore()

const enum Step {
  SelectWhiskey = 0,
  SelectBottle,
  SelectTop,
  Review
}

const steps = ref([Step.SelectWhiskey, Step.SelectBottle, Step.SelectTop, Step.Review])

interface HTMLModelViewer extends HTMLElement {
  model: any
}

function beforeEnter(el: Element) {
  // ;(el as HTMLElement).style.opacity = '1'
}

function leave(el: Element, done: () => void) {
  ;(el as HTMLElement).style.opacity = '0'
  done() // Ensure the transition ends immediately
}

const currentStep = ref<Step>(Step.SelectWhiskey)

const modelViewerRef = ref<HTMLModelViewer | null>(null)

// const bottleImage = computed(() => {
//   switch (currentBottle.value) {
//     case 'WoodCork':
//       return EssexWoodCork
//     case 'RedWax':
//       return EssexWaxRed
//     case 'GreenWax':
//       return EssexWaxGreen
//     default:
//       return EssexWoodCork
//   }
// })

// function setColor(color: string) {
//   if (!modelViewerRef.value?.model) return

//   const [material] = modelViewerRef.value.model.materials
//   material.pbrMetallicRoughness.setBaseColorFactor(color)
// }

const backgroundImageStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .1)), linear-gradient(to top, rgba(0, 0, 0, .8), rgba(0, 0, 0, .1)), linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)), linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0, .1)), url(${Background})`
  }
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

onMounted(() => {
  const modelViewerColor = modelViewerRef.value
  const colorControls = document.getElementById('color-controls')

  if (modelViewerColor && colorControls) {
    colorControls.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const colorString = target.dataset.color
    })
  }
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
