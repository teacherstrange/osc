import groq from 'groq';
import { ROW_SETTINGS } from './rowSettings';

export const MODULE_FORMS = groq`
    _key,
    _type,
    "formName": string::split(formNameAndId, ", ")[0],
    "formId": string::split(formNameAndId, ", ")[1],
    marginBottom,
    paddingBottom,
    paddingTop,
    ${ROW_SETTINGS}
`;
