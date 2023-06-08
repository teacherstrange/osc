import groq from 'groq';

export const CART_QUERY = groq`
    *[ _type == "settings" ] {
        _id,
        emptyCartMessage
    }
`;
