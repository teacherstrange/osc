const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
      productType
    }
  }
`;

const PRODUCT_CARD_FRAGMENT = `#graphql
  ${PRODUCT_VARIANT_FRAGMENT}
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    options {
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        ...ProductVariantFragment
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
  ${PRODUCT_VARIANT_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
        id
        title
        descriptionHtml
        vendor
        options {
            name
            values
        }
        selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
            ...ProductVariantFragment
        }
        variants(first: 10) {
            nodes {
                ...ProductVariantFragment
            }
        }
        collections(first: 1) {
            edges {
                node {
                    handle
                }
            }
        }
    }
  }
`;

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
    ${PRODUCT_CARD_FRAGMENT}
    query productRecommendations(
        $productId: ID!
        $country: CountryCode
        $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
        recommended: productRecommendations(productId: $productId) {
            ...ProductCard
        }
  }
`;
