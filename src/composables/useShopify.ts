import { createStorefrontApiClient } from '@shopify/storefront-api-client'

import * as Queries from '@/graphql/queries'
import * as Mutations from '@/graphql/mutations'

import { useEnv } from '@/composables/useEnv'

const { shopify } = useEnv()

const client = createStorefrontApiClient({
  storeDomain: shopify.storefront.domain,
  apiVersion: '2024-04',
  publicAccessToken: shopify.storefront.apiKey
})

export function useShopify() {
  async function getProductById(id: string) {
    const response = await client.request(Queries.productQuery, {
      variables: {
        id: `gid://shopify/Product/${id}`
      }
    })
    return response
  }

  async function createCart(item: { id: string; wax: string; text?: string }, quantity: number) {
    const attributes = [{ key: 'Wax', value: item.wax }]

    if (item.text) {
      attributes.push({ key: 'Text', value: item.text })
    }

    const response = await client.request(Mutations.createCart, {
      variables: {
        lines: [
          {
            merchandiseId: `${item.id}`,
            attributes,
            quantity
          }
        ]
      }
    })
    return response
  }

  return { getProductById, createCart }
}
