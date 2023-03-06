import groq from 'groq';
import { buildUrls } from './fragments/buildUrls';

export const SETTINGS_QUERY = groq`
    *[ _type == "settings" ] {
        _id,
        _rev,
        _type,
        "mainNavigationId": mainNavigation->navigationId.current,
        actionNav {
            ...,
            account {
                ...,
                link->{
                    ${buildUrls}
                }
            },
            wishlist {
                ...,
                link->{
                    ${buildUrls}
                }
            }
        },
        "contactDetails": {
            email,
            phoneNumber
        },
        "footer": {
            "footerNavigation": footerNavigation[]->navigationId.current,
            "footerBottomNav": footerBottomNav->navigationId.current
        },
        'seo': {
            robots,
            'siteTile': seo.title,
            "titleSeparator": seo.titleSeparator,
            schema {
                ...,
                organizationLogo {
                    asset-> {
                        url,
                        "dimensions": metadata.dimensions
                    }
                }
            },
            'socials': socialProfile
        }
    }
`;
