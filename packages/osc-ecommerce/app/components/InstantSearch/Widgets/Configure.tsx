import { useConfigure } from 'react-instantsearch-hooks-web';

interface ConfigureProps {
    /**
     * Number of hits that should be returned per page
     */
    hitsPerPage?: number;
}

/**
 * The Configure component enables the manual setting of search parameters:
 * https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/react-hooks/#manually-set-search-parameters
 */
export const Configure = (props: ConfigureProps) => {
    const { hitsPerPage } = props;
    useConfigure({ hitsPerPage: hitsPerPage });

    return null;
};
