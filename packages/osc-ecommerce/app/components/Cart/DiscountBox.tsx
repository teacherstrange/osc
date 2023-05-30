import { useFetcher } from '@remix-run/react';
import type { Cart } from '@shopify/hydrogen/storefront-api-types';
import { Button, TextInput } from 'osc-ui';
import { useRef } from 'react';
import { CartAction } from '~/types/shopify';

interface DiscountBoxProps {
    title: string;
    description: string;
    discountCodes: Cart['discountCodes'];
}

export const DiscountBox = (props: DiscountBoxProps) => {
    const { title, description, discountCodes } = props;
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(fetcher);

    const codes = discountCodes?.map(({ code }) => code).join(', ') || null;

    console.log({ codes });
    console.log({ discountCodes });

    if (fetcher.state === 'idle' && inputRef.current) {
        formRef.current?.reset();
        inputRef.current?.blur();
        inputRef.current.value = '';
    }

    return (
        <div className="c-discount-box">
            <h3 className="c-discount-box__ttl">{title}</h3>
            <p className="c-discount-box__desc">{description}</p>

            <p>{codes}</p>

            {/* // TODO: clear input on submit */}
            {/* // TODO: show discounted amount from total? */}
            {/* // TODO: multiple discount codes */}
            <fetcher.Form
                method="post"
                action="/cart"
                className="c-discount-box__form"
                ref={formRef}
            >
                <input type="hidden" name="cartAction" value={CartAction.UPDATE_DISCOUNT} />

                <TextInput
                    id="discountCode"
                    label="Enter your discount code"
                    name="discountCode"
                    type="text"
                    variants={['tertiary']}
                    className="u-w-full"
                    ref={inputRef}
                />
                <Button variant="primary" size="sm">
                    Apply
                </Button>
            </fetcher.Form>

            {codes && codes.length > 0 ? (
                <dl className="c-discount-box__list">
                    <dt className="c-discount-box__term">Discount codes applied:</dt>
                    {codes.map((code, i) => (
                        <dd className="c-discount-box__details" key={i + code}>
                            {code}
                        </dd>
                    ))}
                </dl>
            ) : null}
        </div>
    );
};
