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

const DISCOUNT_CODES_FRAGMENT = `#graphql
    fragment DiscountCodesFragment on CartDiscountCode {
        applicable
        code
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
            }
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
            ...DiscountCodesFragment
        }
    }
    ${DISCOUNT_CODES_FRAGMENT}
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

/* -------------------------------------------------------------------------------------------------
 * Update lines in cart
 * -----------------------------------------------------------------------------------------------*/
export const LINES_UPDATE_MUTATION = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode, $country: CountryCode)
  @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
 * Update discount code mutation
 * -----------------------------------------------------------------------------------------------*/
export const DISCOUNT_CODES_UPDATE = `#graphql
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!], $country: CountryCode = ZZ)
    @inContext(country: $country) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
        cart {
          ...CartLinesFragment
          discountCodes {
            ...DiscountCodesFragment
          }
        }
        errors: userErrors {
          ...ErrorFragment
        }
      }
  }
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
  ${DISCOUNT_CODES_FRAGMENT}
`;

/* -------------------------------------------------------------------------------------------------
 * Update Buyer Identity
 * cartBuyerIdentityUpdate is used to associate customer info with a cart and is used to determine international pricing.
 * -----------------------------------------------------------------------------------------------*/
export const UPDATE_CART_BUYER_ID = `#graphql
 mutation(
   $cartId: ID!
   $buyerIdentity: CartBuyerIdentityInput!
   $country: CountryCode = ZZ
   $language: LanguageCode
 ) @inContext(country: $country, language: $language) {
   cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
     cart {
       id
       buyerIdentity {
         countryCode
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
