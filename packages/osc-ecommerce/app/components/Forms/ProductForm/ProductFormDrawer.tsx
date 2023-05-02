import { mediaQueries as mq } from 'osc-design-tokens';
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
    Icon,
    VisuallyHidden,
    rem,
    useMediaQuery,
} from 'osc-ui';
import { useEffect, useState } from 'react';
import { ProductForm } from './ProductForm';

interface ProductFormDrawerProps {
    hideTrigger?: boolean;
}
export const ProductFormDrawer = (props: ProductFormDrawerProps) => {
    const { hideTrigger } = props;

    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);
    const [showOnGreaterThanTab, setShowOnGreaterThanTab] = useState<boolean>(false);

    const BUTTON_TEXT = 'Enrol now';

    // We need this useEffect to set the showOnTab state only when the window object exists
    // Otherwise we will receive an SSR warning telling us the markup differs from the server
    useEffect(() => {
        setShowOnGreaterThanTab(isGreaterThanTab);
    }, [isGreaterThanTab]);

    return (
        <Drawer direction={showOnGreaterThanTab ? 'right' : 'bottom'} isOffset={true}>
            <DrawerTrigger asChild isPinned className={`${hideTrigger ? 'is-hidden' : ''}`}>
                <Button
                    variant="senary"
                    className={`${
                        showOnGreaterThanTab
                            ? 'c-btn--flush-r c-btn--anim-icon-l'
                            : 'c-btn--flush-b'
                    } u-w-max`}
                >
                    {BUTTON_TEXT} <Icon id={showOnGreaterThanTab ? 'chevron-left' : 'chevron-up'} />
                </Button>
            </DrawerTrigger>
            <DrawerContent innerClassName="u-pt-0 u-pr-0 u-pb-0 u-pl-0">
                <DrawerTrigger asChild isPinned isCloseButton>
                    <Button
                        variant="senary"
                        className={`${
                            showOnGreaterThanTab
                                ? 'c-btn--flush-r c-btn--anim-icon-r'
                                : 'c-btn--flush-b'
                        } c-btn--b-img-none`}
                    >
                        {BUTTON_TEXT}{' '}
                        <Icon id={showOnGreaterThanTab ? 'chevron-right' : 'chevron-down'} />
                    </Button>
                </DrawerTrigger>

                <VisuallyHidden>
                    <DrawerTitle>{BUTTON_TEXT}</DrawerTitle>
                </VisuallyHidden>

                <ProductForm id="drawer" direction={showOnGreaterThanTab ? 'right' : 'bottom'} />
            </DrawerContent>
        </Drawer>
    );
};
