import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import type { StructureBuilder } from 'sanity/desk';

export const faqs = (S: StructureBuilder) =>
    S.listItem()
        .title('FAQs')
        .icon(QuestionMarkCircledIcon)
        .schemaType('faqs')
        .child(S.documentTypeList('faqs'));
