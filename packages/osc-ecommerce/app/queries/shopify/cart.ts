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
                }
                selectedOptions {
                    name
                    value
                }
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
