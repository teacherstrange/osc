import groq from 'groq';
import { buildUrls } from './fragments/buildUrls';

export const NAV_QUERY = groq`
    *[ _type == "navigation" && navigationId.current == $id && !(_id in path("drafts.**")) ] {
        ...,
        "navigationId": navigationId.current,
        navigationItem[] {
            ...,
            "internalLink": internalLink-> {
                "title": coalesce(store.title, title),
                ${buildUrls}
            },
            items[] {
                ...,
                items[] {
                    ...,
                    items[] {
                        ...,
                        "internalLink": internalLink-> {
                            "title": coalesce(store.title, title),
                            ${buildUrls}
                        }
                    },
                    "internalLink": internalLink-> {
                        "title": coalesce(store.title, title),
                        ${buildUrls}
                    },
                }
            }
        }
    }
`;
