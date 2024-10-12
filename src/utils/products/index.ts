export interface ProductVariant {
  id: string
  title: string
  selectedOptions: Array<{
    name: string
    value: string
  }>
  price: { amount: string; currency: 'USD' }
}

interface Option {
  name: string
  value: string | undefined
}

/**
 * Function to find a product variant that matches all the selected options.
 * @param variants - Array of product variants to search.
 * @param options - Array of key-value pairs representing the selected options.
 * @returns The matching product variant or undefined if no match is found.
 */
export function findMatchingVariant(
  variants: Array<ProductVariant>,
  options: Array<Option>
): ProductVariant | undefined {
  return variants.find((variant) =>
    options.every((option) =>
      variant.selectedOptions.some((selectedOption) => {
        return selectedOption.name === option.name && selectedOption.value === option.value
      })
    )
  )
}
