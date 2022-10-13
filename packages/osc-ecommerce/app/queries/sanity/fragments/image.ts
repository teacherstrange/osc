import groq from 'groq';

export const IMAGE = groq`
(_type == 'image') => {
    asset->{
        altText,
        url,
        path,
        "dimensions": metadata {
            "height": dimensions.height,
            "width":dimensions.width,
        },
    }
}
`;
