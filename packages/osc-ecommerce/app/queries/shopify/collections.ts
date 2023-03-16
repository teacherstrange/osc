export const COLLECTIONS_QUERY = `#graphql
    query Collections(
        $country: CountryCode,
        $language: LanguageCode

    ) @inContext(country: $country, language: $language) {
    collections(first: 10, query: "collection_type:smart") {
        nodes {
            id
            title
            handle
        }
    }
}
`;
