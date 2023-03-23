import { PaperPlaneIcon } from '@radix-ui/react-icons';
import type { StructureBuilder } from 'sanity/desk';

export const navigation = (S: StructureBuilder) =>
    S.listItem()
        .title('Navigation')
        .icon(PaperPlaneIcon)
        .schemaType('navigation')
        .child(S.documentTypeList('navigation'));
