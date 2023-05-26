import { useFetcher } from '@remix-run/react';
import { Button, TextInput } from 'osc-ui';

interface DiscountBoxProps {
    title: string;
    description: string;
}

export const DiscountBox = (props: DiscountBoxProps) => {
    const fetcher = useFetcher();
    const { title, description } = props;

    return (
        <div className="c-discount-box">
            <h3 className="c-discount-box__ttl">{title}</h3>
            <p className="c-discount-box__desc">{description}</p>

            <fetcher.Form className="c-discount-box__form">
                <TextInput
                    id="discount-code"
                    label="Enter your discount code"
                    name="discount-code"
                    type="text"
                    variants={['tertiary']}
                    className="u-w-full"
                />
                <Button variant="primary" size="sm">
                    Apply
                </Button>
            </fetcher.Form>
        </div>
    );
};
