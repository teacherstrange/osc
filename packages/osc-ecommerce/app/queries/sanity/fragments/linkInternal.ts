import groq from 'groq';
import { buildUrls } from './buildUrls';

export const LINK_INTERNAL = groq`
    _key,
    _type,
    ...reference->{
        "documentType": _type,
        ${buildUrls},
    }
`;
