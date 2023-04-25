import {
    Button,
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
    Icon,
    VisuallyHidden,
} from 'osc-ui';
import { ProductForm } from './ProductForm';

export const ProductFormDrawer = () => {
    return (
        <Drawer direction="right" isOffset={true}>
            <DrawerTrigger asChild isPinned>
                <Button variant="senary" className="c-btn--flush-r">
                    Enrol now <Icon id="chevron-left" />
                </Button>
            </DrawerTrigger>
            <DrawerContent innerClassName="u-pt-0 u-pr-0 u-pb-0 u-pl-0">
                <DrawerTrigger asChild isPinned isCloseButton>
                    <Button variant="senary" className="c-btn--flush-r">
                        Enrol now <Icon id="chevron-right" />
                    </Button>
                </DrawerTrigger>

                <VisuallyHidden>
                    <DrawerTitle>Enrol now</DrawerTitle>
                </VisuallyHidden>

                <ProductForm />
            </DrawerContent>
        </Drawer>
    );
};
