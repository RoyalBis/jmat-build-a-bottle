import { ref, onMounted } from 'vue'

export function useImagePreloader(imageUrls: string[]) {
  const isLoading = ref<boolean>(true)
  const loadedImages = ref<string[]>([])
  const failedImages = ref<string[]>([])

  const preload = async () => {
    await Promise.all(
      imageUrls.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = () => {
            loadedImages.value.push(src) // Push to loadedImages if successful
            resolve()
          }
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`)
            failedImages.value.push(src) // Push to failedImages on failure
            resolve()
          }
        })
      })
    )
  }

  onMounted(async () => {
    await preload()
    isLoading.value = false // Set to false after all images have either loaded or failed
  })

  return {
    isLoading,
    loadedImages,
    failedImages // Return failedImages to track which ones failed
  }
}
