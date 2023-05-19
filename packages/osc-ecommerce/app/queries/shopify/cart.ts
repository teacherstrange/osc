const USER_ERROR_FRAGMENT = `#graphql
    fragment ErrorFragment on CartUserError {
        message
        field
        code
    }
`;

const LINES_CART_FRAGMENT = `#graphql
    fragment CartLinesFragment on Cart {
        id
        totalQuantity
    }
`;

const MONEY_FRAGMENT = `#graphql
    fragment MoneyFragment on MoneyV2 {
        currencyCode
        amount
    }
`;
const CART_QUERY_FRAGMENT = `#graphql
    fragment CartFragment on Cart {
        id
        checkoutUrl
        totalQuantity
        buyerIdentity {
            countryCode
            customer {
                id
                email
                firstName
                lastName
                displayName
            }
            email
            phone
        }
        lines(first: 100) {
        edges {
            node {
                id
                quantity
                attributes {
                    key
                    value
                }
                cost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                    amountPerQuantity {
                        amount
                        currencyCode
                    }
                    compareAtAmountPerQuantity {
                        amount
                        currencyCode
                    }
                }
                merchandise {
                    ... on ProductVariant {
                        id
                        availableForSale
                        compareAtPrice {
                            ...MoneyFragment
                        }
                        price {
                            ...MoneyFragment
                        }
                        requiresShipping
                        title
                        product {
                            handle
                            title
                            id
                            options {
                                name
                                values
                            }
                        }
                        selectedOptions {
                            name
                            value
                        }
                        sku
                    }
                }
            }
        }
        }
        cost {
            subtotalAmount {
                ...MoneyFragment
            }
            totalAmount {
                ...MoneyFragment
            }
            totalDutyAmount {
                ...MoneyFragment
            }
            totalTaxAmount {
                ...MoneyFragment
            }
        }
        note
        attributes {
            key
            value
        }
        discountCodes {
            code
        }
    }
`;

/* -------------------------------------------------------------------------------------------------
 * Query Cart
 * -----------------------------------------------------------------------------------------------*/
export const CART_QUERY = `#graphql
    ${MONEY_FRAGMENT}
    ${CART_QUERY_FRAGMENT}
    query CartQuery($cartId: ID!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
        cart(id: $cartId) {
            ...CartFragment
        }
    }
`;

/* -------------------------------------------------------------------------------------------------
 * Create new cart mutation
 * -----------------------------------------------------------------------------------------------*/
//! @see: https://shopify.dev/api/storefront/2022-01/mutations/cartcreate
export const CREATE_CART_MUTATION = `#graphql
  mutation ($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...ErrorFragment
      }
    }
  }
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

/* -------------------------------------------------------------------------------------------------
 * Add lines to cart
 * -----------------------------------------------------------------------------------------------*/
export const ADD_LINES_MUTATION = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode = ZZ, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...ErrorFragment
      }
    }
  }
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
`;

/* -------------------------------------------------------------------------------------------------
 * Remove lines to cart
 * -----------------------------------------------------------------------------------------------*/
export const REMOVE_LINE_ITEMS_MUTATION = `#graphql
  mutation ($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode, $country: CountryCode)
  @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ...on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      errors: userErrors {
        message
        field
        code
      }
    }
  }
`;
