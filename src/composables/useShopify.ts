import { createStorefrontApiClient } from '@shopify/storefront-api-client'

import * as Queries from '@/graphql/queries'
import * as Mutations from '@/graphql/mutations'

const client = createStorefrontApiClient({
  storeDomain: 'http://befa28-22.myshopify.com',
  apiVersion: '2024-04',
  publicAccessToken: 'a3d94948b073f1990f0eb475a11c8890'
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

  async function createCart(id: string, wax: string, text?: string) {
    const attributes = [{ key: 'Wax', value: wax }]
    if (text) {
      attributes.push({ key: 'Text', value: text })
    }
    const response = await client.request(Mutations.createCart, {
      variables: {
        lines: [
          {
            merchandiseId: `${id}`,
            attributes
          }
        ]
      }
    })
    return response
  }

  return { getProductById, createCart }
}
