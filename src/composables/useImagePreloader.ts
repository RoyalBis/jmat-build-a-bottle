import { ref, onMounted } from 'vue'

export function useImagePreloader(imageUrls: string[]) {
  const isLoading = ref<boolean>(true)
  const loadedImages = ref<string[]>([])

  const preload = () => {
    const promises = imageUrls.map((src) => {
      return new Promise<void>((resolve, reject) => {
        console.log(src)
        const img = new Image()
        img.src = src
        img.onload = () => {
          loadedImages.value.push(src)
          resolve()
        }
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      })
    })

    return Promise.all(promises)
  }

  onMounted(async () => {
    try {
      await preload()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })

  return {
    isLoading,
    loadedImages
  }
}
