import { useState } from 'react';
import { Configure, usePagination, useSortBy } from 'react-instantsearch-hooks-web';
import { Select, SelectItem } from 'osc-ui';

interface SortByProps {
    items: {
        value: string;
        label: string;
    }[];
}

export function SortBy(props: SortByProps) {
    const { items } = props;
    const { options, refine } = useSortBy({ items });

    // TODO - commented out all sale code as not sure exactly how/when/where this is meant to be used...
    // const [onSale, setOnSale] = useState(false);

    const handleCheckboxChange = (event: string) => {
        // if (event == 'shopify_products_sale') {
        //     setOnSale(!onSale);
        // } else {
        //     setOnSale(false);
        // }

        refine(event);
    };

    return (
        <>
            <Select
                description={{ label: 'Sort By: ', className: 'u-text-bold' }}
                name={'sortBy_select'}
                setExternalValue={handleCheckboxChange}
                groupVariants={['inline', 'tertiary']}
            >
                {options.map((item, index) => {
                    return (
                        <div key={index}>
                            <SelectItem {...item}>{item.label}</SelectItem>
                        </div>
                    );
                })}
            </Select>
            {/* {onSale && <Configure key={`filter-sale`} filters={`compare_at_price > 0`} />}
            {!onSale && <Configure />} */}
        </>
    );
}
