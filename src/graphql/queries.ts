export const productQuery = `
query ProductQuery($id: ID) {
  product(id: $id) {
    variants(first: 100) {
      nodes {
        id
        title
        barcode
        currentlyNotInStock
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        sku
        unitPrice {
          amount
          currencyCode
        }
      }
    }
    availableForSale
    handle
    options {
      id
      name
      values
    }
  }
}
`
