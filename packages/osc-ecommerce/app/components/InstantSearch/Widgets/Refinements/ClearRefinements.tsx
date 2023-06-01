import { classNames } from 'osc-ui';
import { Button } from 'osc-ui';
import type { UseClearRefinementsProps } from 'react-instantsearch-hooks-web';
import { useClearRefinements } from 'react-instantsearch-hooks-web';

interface ClearRefinementProps extends UseClearRefinementsProps {
    className?: string;
}

export const ClearRefinements = (props: ClearRefinementProps) => {
    const { className } = props;

    const { refine } = useClearRefinements(props);

    const classes = classNames('o-flex__item--bottom', className ? className : '');

    return (
        <div className={classes}>
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
