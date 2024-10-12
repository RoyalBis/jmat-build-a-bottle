export const createCart = `
mutation CreateCart($lines: [CartLineInput!]) {
  cartCreate(
    input: {lines: $lines}
  ) {
    cart {
      checkoutUrl
      id
    }
    userErrors {
      field
      message
    }
  }
}
`
