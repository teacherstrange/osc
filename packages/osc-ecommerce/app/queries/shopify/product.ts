export const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
        id
        title
        descriptionHtml
        vendor
        variants(first: 3) {
            nodes {
                sku
            }
        }
    }
  }
`;
