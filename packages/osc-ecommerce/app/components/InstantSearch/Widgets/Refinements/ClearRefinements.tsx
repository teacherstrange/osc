import { Button } from 'osc-ui';
import type { UseClearRefinementsProps } from 'react-instantsearch-hooks-web';
import { useClearRefinements } from 'react-instantsearch-hooks-web';

export const ClearRefinements = (props: UseClearRefinementsProps) => {
    const { refine } = useClearRefinements(props);

    return (
        <div className="o-flex__item--bottom ">
            <Button
                variant="quaternary"
                onClick={() => {
                    refine();
                }}
                className="u-text-underline u-color-neutral-600"
            >
                Clear All
            </Button>
        </div>
    );
};
