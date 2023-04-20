import { mediaQueries as mq } from 'osc-design-tokens';
import { AccessibleIcon, Button, Icon, rem, useMediaQuery } from 'osc-ui';
import { useEffect, useState } from 'react';

export const SaveForLaterButton = () => {
    const TEXT = 'Save for later';

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState(false);

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    return showOnGreaterThanTab ? (
        <Button variant="tertiary" size="sm">
            {TEXT} <Icon id="heart" />
        </Button>
    ) : (
        <Button variant="quaternary" size="lg">
            <AccessibleIcon label={TEXT}>
                <Icon id="heart" />
            </AccessibleIcon>
        </Button>
    );
};
