import { useFetcher } from '@remix-run/react';
import type { Cart } from '@shopify/hydrogen/storefront-api-types';
import { Alert, Button, Icon, TextInput } from 'osc-ui';
import { useEffect, useId, useRef, useState } from 'react';
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
    const [inputValue, setInputValue] = useState('');
    const [active, setActive] = useState(false);
    const triggerId = useId();
    const sectionId = useId();

    const hasNonApplicableCode = discountCodes?.some(({ applicable, code }) => !applicable && code);

    // Get the codes that are applicable to the cart and store them in state
    const applicableCodes =
        discountCodes?.filter(({ applicable }) => applicable)?.map(({ code }) => code) || null;

    // Make sure we're not submitting the same code multiple times
    // Shopify will handle this on the backend but we want to avoid
    // displaying the same code multiple times in the UI
    const uniqueCodes = [...new Set(applicableCodes)];

    const [codes, setCodes] = useState<string[]>(uniqueCodes);

    useEffect(() => {
        if (fetcher.state === 'idle' && inputRef.current) {
            formRef.current?.reset();
            inputRef.current?.blur();
            setInputValue('');
        }
    }, [fetcher.state]);

    return (
        <div className="c-discount-box">
            <h3 className="c-discount-box__ttl">
                <button
                    id={triggerId}
                    className="c-discount-box__tgr"
                    aria-controls={sectionId}
                    aria-expanded={active}
                    onClick={() => setActive(!active)}
                >
                    {title}
                </button>
            </h3>
            <p className="c-discount-box__desc">{description}</p>

            <div
                id={sectionId}
                className="c-discount-box__tggle-box"
                aria-labelledby={triggerId}
                data-state={active ? 'open' : 'closed'}
            >
                <div className="c-discount-box__tggle-inner">
                    <fetcher.Form
                        id="discountForm"
                        method="post"
                        action="/cart"
                        className="c-discount-box__form"
                        ref={formRef}
                        onSubmit={() => {
                            // When the form is submitted, we want to push the new value into the codes state
                            setCodes([...codes, inputRef.current?.value || '']);
                        }}
                    >
                        <input type="hidden" name="cartAction" value={CartAction.UPDATE_DISCOUNT} />
                        <input
                            type="hidden"
                            name="applicableDiscountCodes"
                            value={JSON.stringify(
                                // Filter the codes to only include the ones that are applicable to the cart
                                // This will allow us to submit the form with only the codes that are applicable
                                // rather than all of the codes that have been entered.
                                codes.filter((code) => uniqueCodes?.includes(code))
                            )}
                        />

                        <TextInput
                            id="discountCode"
                            label="Enter your discount code"
                            name="discountCode"
                            type="text"
                            variants={['tertiary']}
                            className="u-w-full"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            tabIndex={active ? 0 : -1}
                            ref={inputRef}
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            isDisabled={!inputValue ? true : false}
                            tabIndex={active ? 0 : -1}
                        >
                            Apply
                        </Button>
                    </fetcher.Form>

                    {hasNonApplicableCode ? (
                        <Alert status="info" className="u-mt-m">
                            A discount code you entered is invalid or not applicable to one or more
                            products in your basket.
                        </Alert>
                    ) : null}

                    {uniqueCodes && uniqueCodes.length > 0 ? (
                        <dl className="c-discount-box__list">
                            <dt className="c-discount-box__term">Discount codes applied:</dt>
                            {uniqueCodes.map((code, i) => (
                                <dd className="c-discount-box__details" key={i + code}>
                                    <span>{code}</span>
                                    <Button
                                        variant="quaternary"
                                        size="sm"
                                        form="discountForm"
                                        onClick={() => setCodes(codes.filter((c) => c !== code))}
                                        tabIndex={active ? 0 : -1}
                                    >
                                        <Icon id="close" />
                                    </Button>
                                </dd>
                            ))}
                        </dl>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
