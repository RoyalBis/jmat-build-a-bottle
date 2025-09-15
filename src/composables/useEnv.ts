export function useEnv() {
  const shopify = {
    storefront: {
      domain: import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN,
      apiKey: import.meta.env.VITE_SHOPIFY_STOREFRONT_API_KEY
    }
  }

  const app = {
    label: {
      characterLimit: parseInt(import.meta.env.VITE_LABEL_MAX_CHARACTER_COUNT)
    },
    orderCutoff: {
      show: import.meta.env.VITE_ORDER_SHOW_CUTOFF_MESSAGE === 'true',
      message: import.meta.env.VITE_ORDER_CUTOFF_MESSAGE
    }
  }

  return {
    shopify,
    app
  }
}
