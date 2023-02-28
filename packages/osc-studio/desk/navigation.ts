import { PaperPlaneIcon } from '@radix-ui/react-icons';
import S from '@sanity/desk-tool/structure-builder';

// prettier-ignore
export const navigation = S.listItem()
    .title('Navigation')
    .icon(PaperPlaneIcon)
    .schemaType('navigation')
    .child(S.documentTypeList('navigation'));
