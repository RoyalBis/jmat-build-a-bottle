import { ref, computed, watch, onUpdated } from 'vue'

import { Step } from '@/constants'

import router from '@/router'
import { useRoute } from 'vue-router'

const steps = ref([
  {
    step: Step.SelectWhiskey,
    hash: '#select-whiskey'
  },
  {
    step: Step.SelectBottle,
    hash: '#select-bottle'
  },
  {
    step: Step.SelectTop,
    hash: '#select-top'
  },
  {
    step: Step.Review,
    hash: '#review'
  }
])

const currentStep = ref<Step>(Step.SelectWhiskey)

export function useNavigation() {
  const route = useRoute()

  const hasNext = computed(() => {
    return currentStep.value < steps.value.length - 1
  })

  const hasPrevious = computed(() => {
    return currentStep.value > 0
  })

  // function getStep() {
  //   const step = steps.value.find((value) => route.hash === value.hash)
  //   return step?.step ?? Step.SelectWhiskey
  // }

  function next() {
    if (hasNext.value) {
      currentStep.value++
    }
  }

  function previous() {
    if (hasPrevious.value) {
      currentStep.value--
    }
  }

  function isStep(step: Step) {
    return currentStep.value === step
  }

  watch(currentStep, () => {
    router.push({ hash: steps.value[currentStep.value].hash })
  })

  onUpdated(() => {
    currentStep.value =
      steps.value.find((value) => route.hash === value.hash)?.step ?? Step.SelectWhiskey
  })

  return { currentStep, next, previous, hasNext, hasPrevious, isStep }
}
