import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import type { Bottle, BottleTop, Whiskey } from '@/types'

const woodCork = {
  name: 'Wood Cork',
  value: 'WoodCork',
  color: 'transparent'
}

export const useBottleStore = defineStore('bottle', () => {
  const whiskey = useStorage<Whiskey | null>('whiskey', null, undefined, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v)
    }
  })
  const bottle = useStorage<Bottle | null>('bottle', null, undefined, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v)
    }
  })
  const bottleTop = useStorage<BottleTop | null>('bottleTop', woodCork, undefined, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v)
    }
  })
  const bottleText = useStorage<string | null>('bottleText', null, undefined, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v)
    }
  })

  const bottleImage = ref(
    computed(() => {
      if (!bottle.value) return ''
      return new URL(
        `../assets/variants/${bottle.value.value}-${bottleTop.value?.value}.png`,
        import.meta.url
      ).href
    })
  )

  const hasWhiskey = ref(
    computed(() => {
      return whiskey.value != null
    })
  )

  const hasBottle = ref(
    computed(() => {
      return bottle.value !== null
    })
  )

  const hasBottleTop = ref(
    computed(() => {
      return bottleTop.value !== null && bottleTop.value.value !== 'WoodCork'
    })
  )

  const isValid = ref(
    computed(() => {
      return hasWhiskey.value && hasBottle.value && hasBottleTop.value
    })
  )

  const selectedOptions = ref(
    computed(() => {
      return [
        {
          name: 'Whiskey',
          value: whiskey.value?.name
        },
        {
          name: 'Bottle',
          value: bottle.value?.name
        }
      ]
    })
  )

  function setWhiskey(_whiskey: Whiskey) {
    whiskey.value = _whiskey
  }

  function setBottle(_bottle: Bottle) {
    bottle.value = _bottle
  }

  function setBottleTop(_bottleTop: BottleTop) {
    bottleTop.value = _bottleTop
  }

  function reset() {
    whiskey.value = null
    bottle.value = null
    bottleTop.value = null
    bottleText.value = null
  }

  return {
    whiskey,
    bottle,
    bottleTop,
    bottleImage,
    bottleText,
    hasWhiskey,
    hasBottle,
    hasBottleTop,
    isValid,
    selectedOptions,
    reset,
    setWhiskey,
    setBottle,
    setBottleTop
  }
})
